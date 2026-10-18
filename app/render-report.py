"""Render only a frozen saved access-brief input. No database, model or network access."""
import sys, json, hashlib, subprocess, os
from pathlib import Path
from datetime import datetime
from xml.sax.saxutils import escape
import reportlab
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table, TableStyle, PageBreak, NextPageTemplate, KeepTogether
from pypdf import PdfReader

MOSS='#68735F'; DARK='#333333'; MUTED='#666B62'; LINE='#E2E6DC'; PALE='#EFF2EB'
W,H=A4; L=48; CW=W-96
sha=lambda b: hashlib.sha256(b).hexdigest()

def main():
    source,out=Path(sys.argv[1]),Path(sys.argv[2])
    inp=json.loads(source.read_text(encoding='utf-8')); b=inp['basis']
    if b['format']!=1 or b['kind']!='docent-access-brief':raise ValueError('Unsupported PDF input. Reopen the saved review.')
    if reportlab.Version!='4.4.9':raise ValueError('The PDF runtime version changed. Restore ReportLab 4.4.9 before generating this template.')
    fontdir=Path(os.environ.get('WINDIR','C:/Windows'))/'Fonts'
    for name,file in [('Segoe','segoeui.ttf'),('SegoeB','seguisb.ttf')]:
        if not (fontdir/file).is_file():raise ValueError('The Segoe UI report font is unavailable. Restore the required font before trying Preview again.')
        if sha((fontdir/file).read_bytes())!=b['template']['fontHashes'][file]:raise ValueError('The report fonts changed while generating. Preview again from the saved assessment.')
        pdfmetrics.registerFont(TTFont(name,str(fontdir/file)))
    fallbacks=[]
    if (fontdir/'msjh.ttc').is_file():
        if sha((fontdir/'msjh.ttc').read_bytes())!=b['template']['fontHashes']['msjh.ttc']:raise ValueError('The report fallback font changed. Preview again.')
        pdfmetrics.registerFont(TTFont('CJK',str(fontdir/'msjh.ttc'),subfontIndex=0));fallbacks=['CJK']
    pdfmetrics.registerFontFamily('Segoe',normal='Segoe',bold='SegoeB',italic='Segoe',boldItalic='SegoeB')
    positions=[]
    def markup(value,bold=False):
        text=str(value if value not in ('',None) else 'Not recorded').replace('\r\n','\n').replace('\r','\n')
        primary='SegoeB' if bold else 'Segoe'; pieces=[]; buf=''; active=primary
        for ch in text:
            if ch=='\n':
                if buf:pieces.append('<font name="'+active+'">'+escape(buf)+'</font>');buf=''
                pieces.append('<br/>');continue
            if ch=='\t':ch=' '
            name=next((n for n in [primary]+fallbacks if ord(ch) in pdfmetrics.getFont(n).face.charToGlyph),None)
            if name is None:raise ValueError('The report font cannot render U+%04X. Replace that character in the owning saved field before generating the PDF.'%ord(ch))
            if name!=active and buf:pieces.append('<font name="'+active+'">'+escape(buf)+'</font>');buf=''
            active=name;buf+=ch
        if buf:pieces.append('<font name="'+active+'">'+escape(buf)+'</font>')
        return ''.join(pieces)
    class TracedParagraph(Paragraph):
        def draw(self):
            x,y=self.canv.absolutePosition(0,0)
            positions.append({'page':self.canv.getPageNumber(),'x':round(x,2),'y':round(y,2),'width':round(self.width,2),'height':round(self.height,2)})
            super().draw()
    def p(text,size=10.3,bold=False,color=DARK,after=0):
        return TracedParagraph(markup(text,bold),ParagraphStyle('body',fontName='SegoeB' if bold else 'Segoe',fontSize=size,leading=size*1.45,textColor=HexColor(color),spaceAfter=after,splitLongWords=True,keepWithNext=bold))
    story=[]
    def add(text,size=10.3,bold=False,color=DARK,after=0):story.append(p(text,size,bold,color,after))
    def section(title):story.extend([Spacer(1,14),p(title,13,True,after=8)])
    def kv(label,value):
        t=Table([[p(label,9,color=MUTED),p(value,9.6)]],colWidths=[145,CW-145],hAlign='LEFT',splitByRow=1,splitInRow=1)
        t.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),0),('RIGHTPADDING',(0,0),(-1,-1),12),('TOPPADDING',(0,0),(-1,-1),4),('BOTTOMPADDING',(0,0),(-1,-1),9),('LINEBELOW',(0,-1),(-1,-1),.6,HexColor(LINE))]));story.append(t)
    def bullet(title,body):
        story.extend([p(title,10.6,True,after=4),p(body,9.8,color=MUTED,after=12)])
    s=b['system']['values']; e=b['assessment']; r=b['review']['values']; control=b['control']['values']; action=b['action']['values']; risk=b['risk']['values']
    stamp=datetime.fromisoformat(inp['generatedAt'].replace('Z','+00:00')).strftime('%d %B %Y, %H:%M UTC')
    labels={'cover':'Assessment / saved review brief','evidence':'Question and evidence','assessment':'Assessment and follow-up','trace':'Traceability and publication'}
    def header(label):
        def draw(c,doc):
            c.saveState();c.setFillColor(HexColor(MOSS));c.setFont('SegoeB',18);c.drawString(L,H-53,'OWL')
            c.setFont('Segoe',8);c.setFillColor(HexColor(MUTED));c.drawString(L+53,H-47,'AI GOVERNANCE')
            c.setFont('SegoeB',8);c.setFillColor(HexColor(MOSS));c.drawRightString(W-L,H-48,'DRAFT / FICTIONAL EXERCISE')
            c.setStrokeColor(HexColor(LINE));c.setLineWidth(.6);c.line(L,H-69,W-L,H-69)
            c.setFont('SegoeB',8.5);c.setFillColor(HexColor(MUTED));c.drawString(L,H-100,label.upper());c.restoreState()
        return draw
    class NumberedCanvas(canvas.Canvas):
        def __init__(self,*args,**kwargs):super().__init__(*args,**kwargs);self._states=[]
        def showPage(self):self._states.append(dict(self.__dict__));self._startPage()
        def save(self):
            total=len(self._states)
            if total>24:raise ValueError('This brief exceeds the 24-page development limit. Reduce the input before generating again.')
            for state in self._states:
                self.__dict__.update(state);self.setStrokeColor(HexColor(LINE));self.setLineWidth(.6);self.line(L,45,W-L,45)
                self.setFont('Segoe',8);self.setFillColor(HexColor(MUTED));self.drawString(L,30,e['record_id']+'  |  snapshot r'+str(e['revision']))
                self.drawRightString(W-L,30,str(self._pageNumber)+' / '+str(total));super().showPage()
            super().save()
    doc=BaseDocTemplate(str(out/'report.pdf'),pagesize=A4,leftMargin=L,rightMargin=L,topMargin=112,bottomMargin=64,title='Docent | Transcript access review brief | Draft',author='OWL - fictional development workspace',invariant=1)
    doc.addPageTemplates([PageTemplate(id=k,frames=Frame(L,64,CW,H-176,leftPadding=0,rightPadding=0,topPadding=0,bottomPadding=0),onPage=header(label)) for k,label in labels.items()])
    def newpage(name):story.extend([NextPageTemplate(name),PageBreak()])
    add('Docent',32,True);add('Transcript access',22,True,after=13)
    add('A focused brief from the saved assessment. Exported '+stamp+'.',10.3,color=MUTED,after=18)
    callout=Table([[p('Review not performed' if r['result']=='Not reviewed' else 'Saved review state: '+(r['result'] or 'Not recorded'),12,True,MOSS)],[p(r['uncertainty'] or 'No reviewed uncertainty response is recorded. Publication does not issue an approval.',9.7)]],colWidths=[CW])
    callout.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),HexColor(PALE)),('BOX',(0,0),(-1,-1),0,HexColor(PALE)),('LEFTPADDING',(0,0),(-1,-1),15),('RIGHTPADDING',(0,0),(-1,-1),15),('TOPPADDING',(0,0),(-1,0),10),('BOTTOMPADDING',(0,-1),(-1,-1),10)]));story.extend([callout,Spacer(1,14)])
    for label,value in [('AI System ID',s['system_id']),('Assessment',e['record_id']),('Evidence cutoff',e['summary']['values']['evidence_cutoff']),('Assessment date',e['summary']['values']['assessment_date'])]:kv(label,value)
    section('What needs to happen next')
    bullet('1  Define the intended audience','Identify the pilot collection, proposed recipients and legitimate sharing boundary.')
    bullet('2  Retain the actual access basis','Provide exact configuration/grants and a source that can be reviewed against that audience.')
    bullet('3  Settle and perform a legitimate check','Select the method, retain the performed result and have an eligible person evaluate it.')
    section('Report coverage');add('This brief covers '+r['id']+' and '+control['id']+', related evidence gaps and '+action['id']+'. Other review items, impacts and detailed risks remain in the full assessment; this is not its complete export.',9.5,color=MUTED)
    newpage('evidence');add('Inspect the basis',25,True);section('The review question');add(r['question'],12,True,after=12)
    for label,value in [('Review item',r['id']),('Criterion',control['id']+' / '+r['criterion_locator']),('Applicability',r['applicability']),('Evaluation level',r['evaluation_level'])]:kv(label,value)
    section('Available context')
    for rec in b['records']:
        v=rec['values'];add(v['title'],10.5,True,after=4);add(v['id']+' | '+(v['version'] or 'Upstream version not recorded')+' | custody: '+v['custody'],9.2,color=MUTED,after=4);add(rec['limitation'],9.6,color=MUTED,after=10)
    section('Claim-specific evidence use')
    uses=b.get('evidenceUses',[])
    if not uses:add('No contextual Evidence use against '+r['id']+' is supplied in this saved assessment. Opening or linking a source does not make it sufficient for the access claim.',10)
    else:
        for use in uses:
            for key,value in use['values'].items():kv(key.replace('_',' '),value)
            capture=use['capturedRecord']
            kv('Captured source',capture['values']['title'])
            kv('Source version / Record revision',capture['values']['version']+' / '+str(capture['target_revision']))
            kv('Original SHA256',use['sourceSha256'] or 'Original not retained')
            kv('Evidence use revision',str(use['revision']))
    newpage('assessment');add('Keep the outcome honest',25,True);section('Current saved state')
    for label,value in [('Review result',r['result']),('Control implementation',control['implementation']),('Review rationale',r['result_rationale']),('Reviewer / review date',(r['reviewer'] or 'Not recorded')+' / '+(r['review_date'] or 'Not recorded')),('Assessment conclusion',e['summary']['values']['conclusion']),('Issued governing decision',s['governing_decision_id'])]:kv(label,value)
    section('Material uncertainty');add(r['uncertainty'],10)
    section('Related risk scenario');add(risk['statement'],10);add('Hypothetical exercise scenario; no actual incident, affected person or effectiveness result is asserted.',9.3,color=MUTED)
    section('Planned follow-up');add(action['work'],10.3,True,after=8)
    for label,value in [('Action / status',action['id']+' / '+action['status']),('Recorded owner',action['owner']+' - exercise role only')]:kv(label,value)
    add('Blocker: '+action['blocker'],9.5,color=MUTED)
    newpage('trace');add('A version you can trace',25,True);section('Exact saved basis')
    for label,value in [('AI System / revision',s['system_id']+' / '+str(b['system']['revision'])),('Workspace revision',str(b['workspace']['revision'])),('Assessment / revision',e['record_id']+' / '+str(e['revision'])),('Review / revision',r['id']+' / '+str(b['review']['revision'])),('Criterion / revision',control['id']+' / '+str(b['control']['revision'])),('Evidence cutoff',e['summary']['values']['evidence_cutoff']),('Export date / zone',stamp),('Report template',b['template']['id']),('Publication status','Draft - not issued or approved')]:kv(label,value)
    section('Sources used in this brief')
    for rec in b['records']:
        v=rec['values'];add(v['id']+' / record revision '+str(rec['revision']),9.5,True);add(v['title']+' | '+(v['version'] or 'upstream version not recorded')+' | custody: '+v['custody'],9.2,color=MUTED,after=9)
    section('Snapshot identity');add(inp['basisDigest'],8.1,color=MUTED,after=6)
    add('SHA-256 identifies the frozen report input and its template/font identity. The retained manifest records the separate PDF/page digests, exact source pins and full saved-workspace fingerprint. A fingerprint does not prove truth, evidence sufficiency or approval.',9.2,color=MUTED)
    section('Historical basis and change')
    add('The assessed system profile and reference captures remain those retained in Assessment r'+str(e['revision'])+'. Current linked records above are frozen at workspace r'+str(b['workspace']['revision'])+'; no latest inventory pointer replaces a captured assessed fact. Make corrections inside OWL, save and generate a new PDF. Earlier bytes stay attached to their original basis. External PDF edits do not update OWL.',9.5)
    doc.build(story,canvasmaker=NumberedCanvas)
    reader=PdfReader(str(out/'report.pdf'));text='\n'.join(page.extract_text() for page in reader.pages)
    for expected in [r['id'],control['id'],action['id'],r['result'],control['implementation'],inp['basisDigest']]:
        if expected and expected not in text:raise ValueError('The generated PDF failed its required text check. The earlier report is kept.')
    if reader.get_fields():raise ValueError('The saved brief must be a static PDF. No form output is admitted.')
    for pos in positions:
        if pos['x']<L-.5 or pos['x']+pos['width']>W-L+.5 or pos['y']<60 or pos['y']+pos['height']>H-107:raise ValueError('The PDF layout exceeded its page bounds. The earlier report is kept.')
    poppler=Path.home()/'.cache/codex-runtimes/codex-primary-runtime/dependencies/native/poppler/Library/bin/pdftoppm.exe'
    if not poppler.is_file():raise ValueError('The PDF preview renderer is unavailable. Restore bundled Poppler, then Preview again.')
    subprocess.run([str(poppler),'-r','105','-png',str(out/'report.pdf'),str(out/'page')],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL,timeout=60)
    page_files=[]
    # Poppler pads names when a document has ten or more pages.
    for i in range(1,len(reader.pages)+1):
        matches=[f for f in out.glob('page-*.png') if int(f.stem.split('-')[-1])==i]
        if len(matches)!=1:raise ValueError('A PDF preview page is missing. The earlier report is kept.')
        f=matches[0];target=out/('page-'+str(i)+'.png')
        if f!=target:f.rename(target)
        page_files.append(target)
    manifest={'format':1,'kind':b['kind'],'basisDigest':inp['basisDigest'],'generatedAt':inp['generatedAt'],'timeZone':inp['timeZone'],'workspaceRevision':b['workspace']['revision'],'workspaceSha256':b['workspace']['sha256'],'assessmentId':e['record_id'],'assessmentRevision':e['revision'],'reviewId':r['id'],'reviewRevision':b['review']['revision'],'template':b['template'],'sourcePins':b['provenance'],'pdfSha256':sha((out/'report.pdf').read_bytes()),'pageSha256':[sha(f.read_bytes()) for f in page_files],'pageCount':len(reader.pages),'formFields':0,'reportlab':reportlab.Version,'paragraphBounds':'passed','filename':'OWL-Docent-Transcript-Access-r'+str(e['revision'])+'-'+inp['basisDigest'][:10]+'.pdf'}
    (out/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')

if __name__=='__main__':
    try:main()
    except Exception as e:
        message=str(e) if isinstance(e,ValueError) else 'The PDF renderer could not complete this input. Check local disk space and the bundled runtime, then Preview again.'
        print(json.dumps({'error':message}));sys.exit(1)
