'use strict';
// Isolated HTTP adapter for the identity backend. It serves no governance or provider route.
const crypto=require('node:crypto');
const token=()=>crypto.randomBytes(32).toString('base64url');
const hash=value=>crypto.createHash('sha256').update(value).digest('hex');
function create({store,send,body,now=()=>Date.now()}){
  const identity=store.identity,team=store.team,preSessions=new Map(),pending=new Set();let closing=false;
  const setupCode=identity.hasUsers()?null:identity.bootstrapCode().code;
  function fail(message,code='identity-request',status=400){throw Object.assign(Error(message),{code,status});}
  function cookie(req,name){const values=(req.headers.cookie||'').split(';').map(part=>part.trim()).filter(part=>part.startsWith(name+'='));if(values.length!==1)return null;const value=values[0].slice(name.length+1);return /^[A-Za-z0-9_-]{43}$/.test(value)?value:null;}
  const setCookie=(res,name,value,maxAge)=>res.setHeader('Set-Cookie',name+'='+value+'; HttpOnly; SameSite=Strict; Path=/'+(maxAge===undefined?'':'; Max-Age='+maxAge));
  function issuePreSession(res){
    const at=now();for(const [key,value]of preSessions)if(value.expiresAt<=at)preSessions.delete(key);
    if(preSessions.size>=64)fail('Sign-in is busy. Wait briefly, then reload sign-in.','identity-busy',429);
    const secret=token(),csrf=token();preSessions.set(hash(secret),{csrf:hash(csrf),expiresAt:at+600000});setCookie(res,'owl_dev_preauth',secret,600);return csrf;
  }
  function requirePreSession(req){
    const secret=cookie(req,'owl_dev_preauth'),key=secret&&hash(secret),entry=key&&preSessions.get(key),csrf=req.headers['x-owl-csrf'];
    if(!entry||entry.expiresAt<=now()||typeof csrf!=='string'||csrf.length>128||entry.csrf!==hash(csrf))fail('Reload sign-in before trying this action.','identity-csrf',403);
    return()=>preSessions.delete(key);
  }
  function principal(req,{mutation=false,allowSetup=false}={}){
    const secret=cookie(req,'owl_dev_session');if(!secret)fail('Sign in to continue.','identity-session',401);
    const csrf=req.headers['x-owl-csrf'];if(mutation&&(typeof csrf!=='string'||csrf.length!==43))fail('Reload this page before trying the action again.','identity-csrf',403);
    return identity.authenticate(secret,{allowSetup,...(mutation?{csrf}:{})});
  }
  function envelope(res,value){
    if(!value||typeof value.token!=='string'||typeof value.csrf!=='string')fail('Sign-in result could not be confirmed. Check account status before retrying.','identity-result',500);
    setCookie(res,'owl_dev_session',value.token);send(res,200,{stage:value.stage,user:value.user,csrf:value.csrf});
  }
  async function input(req,keys){
    let value;try{value=await body(req,65536);}catch{fail('Enter a valid request within the sign-in limits.','identity-request');}
    if(!value||typeof value!=='object'||Array.isArray(value)||Object.keys(value).some(key=>!keys.includes(key)))fail('Use only the supported fields for this action.','identity-fields');return value;
  }
  async function dispatch(req,res,url){
    if(closing)fail('The isolated backend is closing. Reopen it before continuing.','identity-closing',503);
    if(!['GET','POST'].includes(req.method))fail('This method is unavailable.','identity-method',405);
    if(req.method==='POST'&&req.headers.origin!=='http://'+req.headers.host)fail('Open sign-in at this local address before continuing.','identity-origin',403);
    if(req.method==='GET'&&url.pathname==='/'){send(res,200,{mode:'isolated-team-backend',uiConnected:false});return;}
    if(req.method==='GET'&&url.pathname==='/api/identity/context'){
      const secret=cookie(req,'owl_dev_session');
      if(secret){try{const session=identity.authenticate(secret,{allowSetup:true});if(session.csrf){send(res,200,{mode:'isolated-team-backend',uiConnected:false,needsBootstrap:false,csrf:session.csrf,session:{stage:session.stage,user:team.account(session.userId)&&{id:session.userId,name:team.account(session.userId).name,identifier:team.account(session.userId).identifier}}});return;}}catch{}}
      send(res,200,{mode:'isolated-team-backend',uiConnected:false,needsBootstrap:!identity.hasUsers(),csrf:issuePreSession(res),session:null});return;
    }
    if(req.method==='POST'&&['/api/identity/bootstrap','/api/identity/login','/api/identity/enroll'].includes(url.pathname)){
      const consume=requirePreSession(req);let result;
      if(url.pathname.endsWith('/bootstrap'))result=await identity.bootstrap(await input(req,['code','name','identifier','password']));
      else if(url.pathname.endsWith('/login'))result=await identity.login(await input(req,['identifier','password']));
      else result=await identity.enroll(await input(req,['code']));
      consume();envelope(res,result);return;
    }
    if(req.method==='POST'&&url.pathname==='/api/identity/set-password'){
      const actor=principal(req,{mutation:true,allowSetup:true}),value=await input(req,['password']);envelope(res,await identity.setPassword(actor,value.password));return;
    }
    if(req.method==='POST'&&url.pathname==='/api/identity/logout'){
      principal(req,{mutation:true,allowSetup:true});await input(req,[]);identity.logout(cookie(req,'owl_dev_session'));setCookie(res,'owl_dev_session','',0);send(res,200,{status:'signed-out'});return;
    }
    if(req.method==='POST'&&url.pathname==='/api/identity/temporary'){
      const actor=principal(req,{mutation:true}),value=await input(req,['targetId']);send(res,200,identity.issueTemporary(actor.userId,value.targetId));return;
    }
    if(req.method==='GET'&&url.pathname==='/api/identity/status'){const actor=principal(req);send(res,200,identity.status(actor.userId,url.searchParams.get('targetId')||actor.userId));return;}
    if(req.method==='GET'&&url.pathname==='/api/team/context'){const actor=principal(req);send(res,200,team.context(actor.userId));return;}
    if(req.method==='GET'&&url.pathname==='/api/team/my-work'){const actor=principal(req);send(res,200,team.myWork(actor.userId));return;}
    if(req.method==='GET'&&url.pathname==='/api/team/wizard'){const actor=principal(req);if(!team.can(actor.userId,'organization.edit','organization').allowed)fail('Ask an organization administrator to continue setup.','team-forbidden',403);send(res,200,team.wizard(actor.userId));return;}
    if(req.method==='GET'&&url.pathname==='/api/team/events'){const actor=principal(req);send(res,200,team.events(actor.userId));return;}
    if(req.method==='POST'&&url.pathname==='/api/team/command'){
      const actor=principal(req,{mutation:true}),value=await input(req,['id','command','scope','expectedRevision','payload']);
      // Recheck the active session inside the shared mutation transaction, including replay.
      const result=store.teamTransaction(()=>{const current=principal(req,{mutation:true});if(current.userId!==actor.userId)fail('Sign in again before saving.','identity-session',401);return team.command(current.userId,value);});
      send(res,200,result);return;
    }
    fail('This route is outside the isolated account-backend slice. Use the unchanged operator workspace for existing tools.','team-route-unavailable',403);
  }
  async function handle(req,res,url){
    const work=dispatch(req,res,url);pending.add(work);
    try{await work;}catch(error){
      const known=/^(?:team|identity|storage)-/.test(error.code||'');
      const status=known?(error.status||(/(?:signin|credential|session|expired|setup-code|enrollment|identity-invalid)/.test(error.code||'')?401:/permission|access-denied|forbidden|csrf/.test(error.code||'')?403:/conflict/.test(error.code||'')?409:/throttl|busy|queue/.test(error.code||'')?429:400)):500;
      send(res,status,{error:known?error.message:'The account action could not be confirmed. Check account status or reload saved access before trying again.',code:known?error.code:'identity-unconfirmed'});
    }finally{pending.delete(work);}
  }
  return {handle,setupCode,async close(){closing=true;await Promise.allSettled([...pending]);await identity.close?.();}};
}
module.exports={create};
