'use strict';
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),crypto=require('node:crypto'),{spawn}=require('node:child_process');
const hash=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
function rendererIdentity(){
  const root=path.resolve(__dirname,'..'),fontRoot=path.join(process.env.WINDIR||'C:/Windows','Fonts');
  // Existing reports retain these logical identity labels after source relocation.
  const files=[['app/render-report.py','app/render-report.py'],['prototypes/src/assessment-schema.js','app/core/assessment-schema.js'],['prototypes/src/reference-schema.js','app/core/reference-schema.js']];
  const fonts=['segoeui.ttf','seguisb.ttf','msjh.ttc'];
  return{id:'OWL-access-brief-1',reportlab:'4.4.9',codeHashes:Object.fromEntries(files.map(([identity,file])=>[identity,hash(fs.readFileSync(path.join(root,file)))])),fontHashes:Object.fromEntries(fonts.map(file=>[file,fs.existsSync(path.join(fontRoot,file))?hash(fs.readFileSync(path.join(fontRoot,file))):'missing']))};
}
function renderReport(input,{signal,workRoot=path.resolve(__dirname,'../runtime/owl-local/report-work'),python=process.env.OWL_PYTHON_BIN||path.join(os.homedir(),'.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe')}={}){
  const rendererPath=path.join(__dirname,'render-report.py'),matchesRenderer=()=>{try{return hash(fs.readFileSync(rendererPath))===input.basis.template.codeHashes['app/render-report.py'];}catch{return false;}};
  const changedRenderer=()=>Error('The PDF renderer changed after this saved basis was selected. Restart OWL, then Preview again; earlier reports are kept.');
  if(!matchesRenderer())return Promise.reject(changedRenderer());
  fs.mkdirSync(workRoot,{recursive:true});const base=fs.realpathSync(workRoot),dir=fs.mkdtempSync(path.join(base,'render-'));
  return new Promise((resolve,reject)=>{
    const finish=(error,value)=>{if(done)return;done=true;clearTimeout(timer);signal?.removeEventListener('abort',abort);try{const target=path.resolve(dir);if(path.dirname(target)!==base||!path.basename(target).startsWith('render-'))throw Error('Unexpected render-work path.');fs.rmSync(target,{recursive:true,force:true});}catch{if(!error)error=Error('PDF rendered but temporary storage could not be reconciled. The earlier report is kept.');}error?reject(error):resolve(value);};
    let done=false,output='',child,timer;const abort=()=>{child?.kill();finish(Error('PDF generation was interrupted. The earlier reports and saved work are kept.'));};
    try{
      if(signal?.aborted){abort();return;}fs.writeFileSync(path.join(dir,'input.json'),JSON.stringify(input));
      child=spawn(python,[rendererPath,path.join(dir,'input.json'),dir],{windowsHide:true,stdio:['ignore','pipe','pipe']});
      signal?.addEventListener('abort',abort,{once:true});timer=setTimeout(()=>{child.kill();finish(Error('The PDF renderer did not finish within 120 seconds. The earlier report is kept; Preview again to retry.'));},120000);
      child.stdout.on('data',b=>{output+=b.toString();if(output.length>4000){child.kill();finish(Error('The PDF renderer returned an oversized diagnostic. The earlier report is kept.'));}});child.stderr.on('data',()=>{});
      child.on('error',e=>finish(Error(e.code==='ENOENT'?'The PDF runtime is unavailable. Check the bundled Python runtime or OWL_PYTHON_BIN, then Preview again.':'The PDF renderer could not start. Check the local runtime and try Preview again.')));
      child.on('close',code=>{if(done)return;if(code!==0){let message;try{message=JSON.parse(output).error;}catch{}finish(Error(message||'The PDF renderer failed. Your saved work and earlier report are kept. Try Preview again; if it repeats, inspect the local renderer.'));return;}if(!matchesRenderer()){finish(changedRenderer());return;}try{const manifest=JSON.parse(fs.readFileSync(path.join(dir,'manifest.json'),'utf8'));if(!Number.isInteger(manifest.pageCount)||manifest.pageCount<1||manifest.pageCount>24)throw Error('Invalid page count');const bounded=(name,max)=>{const p=path.join(dir,name);if(fs.statSync(p).size>max)throw Error('Rendered artifact is too large.');return fs.readFileSync(p);};finish(null,{manifest,pdf:bounded('report.pdf',12*1024*1024),pages:Array.from({length:manifest.pageCount},(_,i)=>bounded('page-'+(i+1)+'.png',4*1024*1024))});}catch{finish(Error('The PDF output could not be validated. The earlier report is kept; Preview again to retry.'));}});
    }catch{finish(Error('PDF working storage is unavailable. Free local space or check its permissions, then Preview again.'));}
  });
}
function createPDFService(store,{renderer=renderReport,template=rendererIdentity(),workRoot}={}){
  let active=null,closed=false;const jobs=new Set();
  function start(request){if(closed)throw Error('OWL is closing. Reopen it before generating a PDF.');const begun=store.reports.begin(request,template);if(!begun.created)return begun.report;const controller=new AbortController(),id=begun.report.id;active={id,controller};const job=Promise.resolve().then(()=>renderer(store.reports.input(id),{signal:controller.signal,workRoot})).then(result=>store.reports.complete(id,result)).catch(e=>{try{store.reports.fail(id,e.message||'The PDF could not be confirmed. The earlier report is kept.');}catch{/* Pending durable ticket is reconciled on restart. */}}).finally(()=>{if(active?.id===id)active=null;jobs.delete(job);});jobs.add(job);return begun.report;}
  function list(){let key=null,error='';try{key=require('./store.cjs').digest(store.reports.freeze(template));}catch(e){error=e.message;}return{reports:store.reports.list().map(r=>({...r,current:r.status==='ready'&&r.basisDigest===key})),currentBasisDigest:key,error};}
  return{start,list,get:id=>{const report=store.reports.get(id);if(!report)throw Error('The PDF generation was not found. Open saved versions.');return{...report,current:report.status==='ready'&&list().currentBasisDigest===report.basisDigest};},idle:()=>Promise.allSettled([...jobs]),close:async()=>{closed=true;if(active){store.reports.fail(active.id,'OWL closed before this PDF was confirmed. Saved work and earlier reports are kept. Preview again to retry.','unconfirmed');active.controller.abort();}await Promise.allSettled([...jobs]);}};
}
module.exports={rendererIdentity,renderReport,createPDFService};
