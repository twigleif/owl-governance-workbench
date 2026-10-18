'use strict';
// Technical retained outputs; never a governance-record writer.
const crypto=require('node:crypto');
const A=require('./core/assessment-core.js');
const copy=x=>JSON.parse(JSON.stringify(x)),hash=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
function createReports(db,{read,digest,fail,ids,source,managedSource=()=>null,provenance,fault=()=>{},onReady=()=>{}}){
  db.exec(`CREATE TABLE IF NOT EXISTS pdf_reports(id TEXT PRIMARY KEY,status TEXT NOT NULL,basis_digest TEXT NOT NULL,input_json TEXT NOT NULL,manifest_json TEXT,pdf BLOB,error TEXT NOT NULL DEFAULT '',created_at TEXT NOT NULL,finished_at TEXT);
    CREATE TABLE IF NOT EXISTS pdf_report_pages(report_id TEXT NOT NULL REFERENCES pdf_reports(id),page INTEGER NOT NULL,png BLOB NOT NULL,PRIMARY KEY(report_id,page));
    CREATE TABLE IF NOT EXISTS pdf_requests(id TEXT PRIMARY KEY,digest TEXT NOT NULL,report_id TEXT NOT NULL REFERENCES pdf_reports(id));`);
  db.prepare("UPDATE pdf_reports SET status='unconfirmed',error='OWL restarted before this PDF was confirmed. The earlier reports and saved work are kept. Preview again to make a new attempt.',finished_at=? WHERE status='running'").run(new Date().toISOString());
  const validId=id=>{if(typeof id!=='string'||!/^[-\w]{8,120}$/.test(id))fail('A stable PDF generation identifier is required.','pdf-invalid');return id;};
  const raw=id=>db.prepare('SELECT * FROM pdf_reports WHERE id=?').get(validId(id))||null;
  const tx=fn=>{db.exec('BEGIN IMMEDIATE');try{const result=fn();db.exec('COMMIT');return result;}catch(e){if(db.isTransaction)db.exec('ROLLBACK');throw e;}};
  function freeze(template){
    const {workspace:w}=read(),assessment=A.find(w,ids.assessment),review=A.getUnit(assessment,'review',ids.secondReview);
    if(!assessment||!review)fail('The selected access review is missing. Open its saved assessment before generating a PDF.','pdf-basis');
    const row=(kind,id)=>{const value=(kind==='systems'?w.systems:w.references[kind]).find(r=>!r.deleted_at&&r.values[kind==='systems'?'system_id':'id']===id);if(!value)fail('A report dependency is missing: '+id+'. Restore its saved link before generating the brief.','pdf-basis');return copy(value);};
    const records=[ids.public,ids.baseline,ids.plan].map(id=>{const r=row('records',id);let s;try{s=source(id);}catch(e){fail('The saved original for '+id+' cannot be verified. '+e.message+' Earlier PDFs are kept.','pdf-basis');}return{...r,bodySha256:s.body===null?null:hash(Buffer.from(s.body)),limitation:s.limitation};});
    const evidenceUses=assessment.evidence.filter(r=>!r.deleted_at&&r.values.item_type==='Review item'&&r.values.item_id===ids.secondReview).map(r=>{
      const capture=assessment.captures.find(c=>c.unit==='evidence'&&c.row_id===r.values.id&&c.field==='record_id');
      if(!capture||capture.target_id!==r.values.record_id)fail('Evidence '+r.values.id+' has no exact retained source capture. Open the link and select its source before generating a new PDF.','pdf-basis');
      let current=records.find(x=>x.values.id===capture.target_id);
      if(!current){const original=managedSource(capture.target_id);if(original){current={...row('records',capture.target_id),bodySha256:original.sha256,limitation:original.limitation,managed:true};records.push(current);}}
      if(!current||!current.managed&&digest(current.values)!==digest(capture.values))fail('Evidence '+r.values.id+' refers to an earlier source version that this development slice cannot reopen. Earlier PDFs are kept. Inspect its source before generating another.','pdf-basis');
      return{...copy(r),capturedRecord:copy(capture),sourceSha256:current.bodySha256};
    });
    return{format:1,kind:'docent-access-brief',workspace:{id:w.workspace_id,revision:w.revision,nativeVersion:w.version,sha256:digest(w)},template:copy(template),system:row('systems',ids.system),assessment:copy(assessment),review:copy(review),evidenceUses,requirement:row('requirements',ids.secondRequirement),risk:row('risks',ids.secondRisk),control:row('controls',ids.secondControl),action:row('actions',ids.secondAction),links:[row('links',ids.secondRiskLink),row('links',ids.secondRequirementLink)],records,provenance:copy(provenance)};
  }
  function describe(r){if(!r)return null;const input=JSON.parse(r.input_json),basis=input.basis;return{id:r.id,status:r.status,error:r.error,createdAt:r.created_at,finishedAt:r.finished_at,basisDigest:r.basis_digest,workspaceRevision:basis.workspace.revision,assessmentId:basis.assessment.record_id,assessmentRevision:basis.assessment.revision,reviewId:basis.review.values.id,reviewRevision:basis.review.revision,manifest:r.manifest_json?JSON.parse(r.manifest_json):null};}
  const get=id=>describe(raw(id));
  function begin(request,template){
    if(!request||Object.keys(request).sort().join(',')!=='expectedAssessmentRevision,expectedRevision,id')fail('PDF generation requires the displayed saved workspace and Assessment revisions.','pdf-invalid');validId(request.id);
    return tx(()=>{
      const requestHash=digest(request),previous=db.prepare('SELECT * FROM pdf_requests WHERE id=?').get(request.id);
      if(previous){if(previous.digest!==requestHash)fail('This PDF generation ID has different values. Open the saved result; your records are kept.','pdf-conflict');return{created:false,report:get(previous.report_id)};}
      const basis=freeze(template);
      if(request.expectedRevision!==basis.workspace.revision||request.expectedAssessmentRevision!==basis.assessment.revision)fail('Saved work changed. Reopen the saved assessment before generating its PDF; your edits are kept.','pdf-conflict');
      const key=digest(basis),ready=db.prepare("SELECT * FROM pdf_reports WHERE basis_digest=? AND status='ready' ORDER BY rowid DESC LIMIT 1").get(key);
      if(ready){db.prepare('INSERT INTO pdf_requests VALUES(?,?,?)').run(request.id,requestHash,ready.id);return{created:false,report:describe(ready)};}
      if(db.prepare("SELECT 1 FROM pdf_reports WHERE status='running'").get())fail('A PDF is already being generated. Wait for its saved result before making another.','pdf-busy');
      if(db.prepare('SELECT count(*) n FROM pdf_reports').get().n>=32)fail('This development workspace retains 32 PDF attempts. Earlier reports are kept; review retention before generating more.','pdf-capacity');
      const at=new Date().toISOString(),input={basis,basisDigest:key,generatedAt:at,timeZone:'UTC'};
      db.prepare("INSERT INTO pdf_reports(id,status,basis_digest,input_json,created_at) VALUES(?,'running',?,?,?)").run(request.id,key,JSON.stringify(input),at);
      db.prepare('INSERT INTO pdf_requests VALUES(?,?,?)').run(request.id,requestHash,request.id);return{created:true,report:get(request.id)};
    });
  }
  function complete(id,artifact){
    const r=raw(id);if(!r||r.status!=='running')return get(id);const input=JSON.parse(r.input_json),m=artifact.manifest;
    if(!m||m.basisDigest!==r.basis_digest||m.generatedAt!==input.generatedAt||m.pdfSha256!==hash(artifact.pdf)||!Buffer.isBuffer(artifact.pdf)||artifact.pdf.length>12*1024*1024||!artifact.pdf.subarray(0,5).equals(Buffer.from('%PDF-'))||m.pageCount<1||m.pageCount>24||artifact.pages.length!==m.pageCount||m.formFields!==0||m.reportlab!=='4.4.9')fail('The rendered PDF did not match its frozen input or file checks. The earlier report is kept.','pdf-render');
    let total=artifact.pdf.length;for(let i=0;i<artifact.pages.length;i++){const p=artifact.pages[i];if(!Buffer.isBuffer(p)||p.length>4*1024*1024||!p.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))||m.pageSha256[i]!==hash(p))fail('A PDF preview page failed its integrity check. The earlier report is kept.','pdf-render');total+=p.length;}
    if(total>40*1024*1024)fail('The report exceeds this development renderer’s size limit. Reduce the report input before trying again.','pdf-render');
    const result=tx(()=>{fault('pdf-before-write');db.prepare("UPDATE pdf_reports SET status='ready',manifest_json=?,pdf=?,finished_at=? WHERE id=? AND status='running'").run(JSON.stringify(m),artifact.pdf,new Date().toISOString(),id);for(let i=0;i<artifact.pages.length;i++)db.prepare('INSERT INTO pdf_report_pages VALUES(?,?,?)').run(id,i+1,artifact.pages[i]);onReady(get(id));fault('pdf-before-commit');return get(id);});fault('pdf-after-commit');return result;
  }
  function failReport(id,message,status='failed'){if(!['failed','unconfirmed'].includes(status))fail('Unknown PDF outcome.');db.prepare("UPDATE pdf_reports SET status=?,error=?,finished_at=? WHERE id=? AND status='running'").run(status,String(message).slice(0,1000),new Date().toISOString(),validId(id));return get(id);}
  function binary(id,part,page){const r=raw(id);if(!r||r.status!=='ready')fail('This PDF is not ready. Reopen its saved result before downloading.','pdf-missing');const m=JSON.parse(r.manifest_json);let bytes,expected;if(part==='pdf'){bytes=Buffer.from(r.pdf);expected=m.pdfSha256;}else if(part==='page'&&Number.isInteger(page)&&page>=1&&page<=m.pageCount){const p=db.prepare('SELECT png FROM pdf_report_pages WHERE report_id=? AND page=?').get(id,page);if(!p)fail('This saved preview page is missing. The report is kept; inspect recovery before replacing it.','pdf-missing');bytes=Buffer.from(p.png);expected=m.pageSha256[page-1];}else fail('Choose a valid saved PDF page.','pdf-invalid');if(hash(bytes)!==expected)fail('This saved report failed its integrity check. Do not use it; recover the retained copy.','pdf-integrity');return{bytes,sha256:expected,manifest:m};}
  return{freeze,begin,get,raw,input:id=>{const r=raw(id);if(!r)fail('PDF generation was not found. Open saved versions.','pdf-missing');return JSON.parse(r.input_json);},complete,fail:failReport,binary,list:()=>db.prepare('SELECT * FROM pdf_reports ORDER BY rowid DESC').all().map(describe)};
}
module.exports={createReports};
