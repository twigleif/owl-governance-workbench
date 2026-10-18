'use strict';
const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {createStore}=require('./store.cjs'),codex=require('./codex.cjs');
function createServer({database=path.resolve(__dirname,'../runtime/owl-local/workspace.sqlite'),seed=false,agent=codex,pdfRenderer,pdfTemplate,pdfWorkRoot,team=false,teamMode=team,identityOptions={}}={}){
  const store=createStore(database,{seed,teamMode,identityOptions}),token=crypto.randomBytes(32).toString('hex');let activeRun=null;
  const originals=teamMode?null:require('./original-preview.cjs').create();
  const chat=teamMode?null:require('./chat-service.cjs').createChatService(store,{agent,isLegacyRunning:()=>!!activeRun});
  const pdf=teamMode?null:require('./pdf-service.cjs').createPDFService(store,{renderer:pdfRenderer,template:pdfTemplate,workRoot:pdfWorkRoot});
  const root=path.resolve(__dirname,'..');
  const assets={'/app.css':[path.join(__dirname,'public/app.css'),'text/css'],'/app.js':[path.join(__dirname,'public/app.js'),'text/javascript'],'/base.css':[path.join(root,'app/public/styles/docent-workspace-preview.css'),'text/css']};
  assets['/saved-access-brief.pdf']=[path.join(root,'output/pdf/OWL-Docent-Transcript-Access-Brief.pdf'),'application/pdf'];
  assets['/chat.js']=[path.join(__dirname,'public/chat.js'),'text/javascript'];
  assets['/chat.css']=[path.join(root,'app/public/styles/docent-agent-preview.css'),'text/css'];
  assets['/chat-workflow.css']=[path.join(root,'app/public/styles/chat-workflow-preview.css'),'text/css'];
  assets['/reports.js']=[path.join(__dirname,'public/reports.js'),'text/javascript'];
  assets['/workspace.js']=[path.join(__dirname,'public/workspace.js'),'text/javascript'];
  assets['/organization-navigation.js']=[path.join(__dirname,'public/organization-navigation.js'),'text/javascript'];
  assets['/organization.js']=[path.join(__dirname,'public/organization.js'),'text/javascript'];
  assets['/organization.css']=[path.join(__dirname,'public/organization.css'),'text/css'];
  assets['/evidence.js']=[path.join(__dirname,'public/evidence.js'),'text/javascript'];
  for(const name of ['editing.js','activity.js'])assets['/'+name]=[path.join(__dirname,'public',name),'text/javascript'];
  assets['/editing.css']=[path.join(__dirname,'public/editing.css'),'text/css'];
  assets['/review.js']=[path.join(__dirname,'public/review.js'),'text/javascript'];
  assets['/review.css']=[path.join(__dirname,'public/review.css'),'text/css'];
  for(const name of ['reviews.css','reviews-adapter.css','reviews.js','intake.css','intake.js','original-client.js','popups.js'])assets['/'+name]=[path.join(__dirname,'public',name),name.endsWith('.js')?'text/javascript':'text/css'];
  for(const name of ['authoring.js','authoring-client.js'])assets['/'+name]=[path.join(__dirname,'public',name),'text/javascript'];
  assets['/authoring-format.js']=[path.join(__dirname,'authoring-format.cjs'),'text/javascript'];
  assets['/authoring.css']=[path.join(root,'app/public/styles/system-card-preview.css'),'text/css'];assets['/evidence-drafts.css']=[path.join(root,'app/public/styles/evidence-drafts-preview.css'),'text/css'];
  assets['/change-review.js']=[path.join(root,'app/core/register-change-review.js'),'text/javascript'];
  assets['/workspace.css']=[path.join(root,'app/public/styles/workspace-redesign-preview.css'),'text/css'];
  assets['/evidence.css']=[path.join(root,'app/public/styles/evidence-inventory-preview.css'),'text/css'];
  assets['/sample-portraits.png']=[path.join(root,'assets/appearance/sample-portraits.png'),'image/png'];
  function send(res,status,value){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(JSON.stringify(value));}
  async function body(req,limit=20000){const chunks=[];let bytes=0;for await(const b of req){bytes+=b.length;if(bytes>limit)throw Error('Request is too large.');chunks.push(b);}return JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks))||'{}');}
  const teamTransport=teamMode?require('./team-transport.cjs').create({store,send,body}):null;
  const server=http.createServer(async(req,res)=>{
    try{
      const expected='127.0.0.1:'+server.address().port;
      if(req.headers.host!==expected||req.headers.origin&&req.headers.origin!=='http://'+expected||req.headers['sec-fetch-site']==='cross-site'){send(res,403,{error:'Use the local OWL address.'});return;}
      const url=new URL(req.url,'http://'+expected);
      if(teamTransport){await teamTransport.handle(req,res,url);return;}
      if(req.method==='GET'&&url.pathname==='/'){res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','Content-Security-Policy':"default-src 'self'; connect-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data: blob:; frame-ancestors 'none'; base-uri 'none'; form-action 'self'"});res.end(fs.readFileSync(path.join(__dirname,'public/index.html'),'utf8').replace('__TOKEN__',token));return;}
      if(req.method==='GET'&&assets[url.pathname]){const [file,type]=assets[url.pathname];res.writeHead(200,{'Content-Type':type+'; charset=utf-8','X-Content-Type-Options':'nosniff'});res.end(fs.readFileSync(file));return;}
      if(req.headers['x-owl-session']!==token){send(res,403,{error:'Reload OWL to reconnect this local session.'});return;}
      if(req.method==='GET'&&url.pathname==='/api/authoring'){send(res,200,store.authoring.context());return;}
      if(req.method==='POST'&&url.pathname==='/api/authoring/prepare'){send(res,200,store.authoring.prepare(await body(req,131072)));return;}
      if(req.method==='POST'&&url.pathname==='/api/authoring/command'){const request=await body(req,131072);if(!['save_authored_document','retain_authored_version'].includes(request.command))throw Error('Use the document editor for this Save.');send(res,200,store.operation(request));return;}
      if(req.method==='GET'&&url.pathname==='/api/authoring/version'){send(res,200,store.authoring.version(url.searchParams.get('id'),Number(url.searchParams.get('version'))));return;}
      if(req.method==='GET'&&url.pathname==='/api/authoring/source'){const value=store.authoring.source(url.searchParams.get('id'));if(!value)throw Error('This saved document is unavailable. Open its Record and exact version.');send(res,200,value);return;}
      if(req.method==='POST'&&url.pathname==='/api/original'){const input=await require('./original-transport.cjs').multipart(req),file=await originals.validate(input.file);send(res,200,store.operation(input.request,file));return;}
      if(req.method==='GET'&&url.pathname==='/api/original/info'){const r=store.originals.source(url.searchParams.get('id'));if(!r)throw Error('This original is unavailable. Open its Record and check its stored location.');send(res,200,r);return;}
      if(req.method==='GET'&&['/api/original/file','/api/original/preview'].includes(url.pathname)){const r=store.originals.get(url.searchParams.get('id'));if(!r)throw Error('This original is unavailable. Restore its exact bytes from a verified backup.');let file={bytes:r.body,media:r.media};const preview=url.pathname.endsWith('/preview');if(preview){const page=Number(url.searchParams.get('page')||1);if(!Number.isInteger(page)||page<1||page>r.pages)throw Error('Choose an available page.');file=await originals.preview(r,page);}res.writeHead(200,{'Content-Type':file.media,'Content-Length':file.bytes.length,'Content-Disposition':preview?'inline':'attachment; filename="'+r.name.replace(/[^\x20-\x7e]/g,'_')+'"', 'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','X-OWL-SHA256':r.sha256});res.end(file.bytes);return;}
      if(req.method==='GET'&&url.pathname==='/api/state'){send(res,200,store.view());return;}
      if(req.method==='GET'&&url.pathname==='/api/workspace'){send(res,200,require('./workspace-view.cjs').project(store));return;}
      if(req.method==='GET'&&url.pathname==='/api/organization'){send(res,200,require('./organization-view.cjs').project(store));return;}
      if(req.method==='GET'&&url.pathname==='/api/activity'){send(res,200,store.activity.list({scope:url.searchParams.get('scope')||'all',subject:url.searchParams.get('subject')||'',q:url.searchParams.get('q')||'',type:url.searchParams.get('type')||'all',offset:Number(url.searchParams.get('offset')||0)}));return;}
      if(req.method==='GET'&&url.pathname==='/api/activity/event'){send(res,200,store.activity.get(url.searchParams.get('id')));return;}
      if(req.method==='GET'&&url.pathname==='/api/reports'){send(res,200,pdf.list());return;}
      if(req.method==='POST'&&url.pathname==='/api/report/generate'){send(res,202,pdf.start(await body(req)));return;}
      if(req.method==='GET'&&url.pathname==='/api/report'){send(res,200,pdf.get(url.searchParams.get('id')));return;}
      if(req.method==='GET'&&url.pathname==='/api/report/file'){const part=url.searchParams.get('part'),file=store.reports.binary(url.searchParams.get('id'),part,Number(url.searchParams.get('page')));res.writeHead(200,{'Content-Type':part==='pdf'?'application/pdf':'image/png','Content-Length':file.bytes.length,'Content-Disposition':part==='pdf'?'attachment; filename="'+file.manifest.filename+'"':'inline','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','X-OWL-SHA256':file.sha256});res.end(file.bytes);return;}
      if(req.method==='GET'&&url.pathname==='/api/connection'){send(res,200,await agent.status());return;}
      if(req.method==='GET'&&url.pathname==='/api/source'){send(res,200,store.tool('owl_get_source',{recordId:url.searchParams.get('id')}));return;}
      if(req.method==='GET'&&url.pathname==='/api/operation'){const receipt=store.receipt(url.searchParams.get('id'));send(res,200,{receipt:receipt?JSON.parse(receipt):null});return;}
      if(req.method==='GET'&&url.pathname==='/api/run'){send(res,200,store.run(url.searchParams.get('id')));return;}
      if(req.method==='GET'&&url.pathname==='/api/chats'){send(res,200,{conversations:store.chats.list(),legacy:store.listRuns()});return;}
      if(req.method==='GET'&&url.pathname==='/api/chat'){send(res,200,store.chats.get(url.searchParams.get('id')));return;}
      if(req.method==='GET'&&url.pathname==='/api/chat/turn'){send(res,200,store.chats.turn(url.searchParams.get('id')));return;}
      if(req.method==='GET'&&url.pathname==='/api/chat/context'){const c=store.chats.get(url.searchParams.get('id')),basis=codex.taskProjection(store.view());send(res,200,{basis,history:store.chats.history(c.id),sources:basis.sources.map(r=>store.tool('owl_get_source',{recordId:r.id})),limits:{messageCharacters:2000,historyCharacters:32000,turns:24,seconds:120},excluded:['Organization context and responsibilities','System purpose and owner notes','Private review rationale','Unrelated saved request drafts']});return;}
      if(req.method==='POST'&&url.pathname==='/api/chat/create'){const input=await body(req);if(Object.keys(input).join(',')!=='id')throw Error('Only a new conversation ID is accepted.');send(res,200,store.chats.create(input.id));return;}
      if(req.method==='POST'&&url.pathname==='/api/chat/send'){send(res,202,chat.start(await body(req)));return;}
      if(req.method==='POST'&&url.pathname==='/api/chat/stop'){const input=await body(req);if(Object.keys(input).join(',')!=='id')throw Error('A turn ID is required.');send(res,200,chat.stop(input.id));return;}
      if(req.method==='POST'&&url.pathname==='/api/chat/composer'){send(res,200,store.chats.composer(await body(req)));return;}
      if(req.method==='POST'&&url.pathname==='/api/chat/edit'){send(res,200,store.chats.edit(await body(req)));return;}
      if(req.method==='POST'&&url.pathname==='/api/command'){const request=await body(req);if(['save_authored_document','retain_authored_version'].includes(request.command))throw Error('Use the document editor for this Save.');send(res,200,store.operation(request));return;}
      if(req.method==='POST'&&url.pathname==='/api/agent'){
        const input=await body(req);if(Object.keys(input).some(k=>k!=='id'))throw Error('Only the predefined fictional access-review task is available.');
        const old=store.run(input.id);if(old){send(res,200,old);return;}if(activeRun||chat.isActive()){send(res,409,{error:'An agent task is already running. Check its result before starting another.'});return;}
        store.beginRun(input.id);activeRun=input.id;
        try{const result=await agent.prepareAccessReview(store);send(res,200,store.finishRun(input.id,'draft',result));}
        catch(e){send(res,200,store.finishRun(input.id,'unconfirmed',{message:e.message||'Agent result could not be confirmed. No governance record was changed.'}));}
        finally{activeRun=null;}return;
      }
      send(res,404,{error:'This route is not available in the first application slice.'});
    }catch(e){if(e.code==='ERR_SQLITE_ERROR'){if([5,6].includes(e.errcode))Object.assign(e,{message:'Local storage is busy. Your edits are kept. Wait for the current Save, then try again.',code:'storage-busy'});else if(e.errcode===13)Object.assign(e,{message:'Local storage is full. Your edits are kept. Free space on the workspace drive, then try Save again.',code:'storage-full'});else if(e.errcode===10)Object.assign(e,{message:'OWL could not write to local storage. Your edits are kept. Check that the workspace drive is available, then try again.',code:'storage-io'});}send(res,['authoring-conflict','authoring-basis','authoring-source','authoring-record-id','workspace-conflict','operation-conflict','chat-conflict','chat-busy','pdf-conflict','pdf-busy','evidence-conflict','evidence-source','evidence-id','evidence-duplicate'].includes(e.code)?409:400,{error:e.message||'The operation failed. Your edits are kept.',code:e.code||'request-error',...e.existingId?{existingId:e.existingId,removed:!!e.removed}:{},...e.suggestion?{suggestion:e.suggestion}:{}});}
  });
  return{server,store,chat,pdf,teamSetupCode:teamTransport?.setupCode||null,listen:port=>new Promise(resolve=>server.listen(port,'127.0.0.1',()=>resolve('http://127.0.0.1:'+server.address().port))),close:async()=>{await teamTransport?.close();await chat?.close();await pdf?.close();return new Promise(resolve=>server.close(()=>{store.close();resolve();}));}};
}
if(require.main===module){const app=createServer({seed:process.argv.includes('--docent-demo')});app.listen(Number(process.env.OWL_PORT||4318)).then(url=>console.log(JSON.stringify({url,mode:'fictional-development',database:'runtime/owl-local/workspace.sqlite',engine:app.store.engine})));for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>app.close().then(()=>process.exit(0)));}
module.exports={createServer};
