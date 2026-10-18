'use strict';
const path=require('node:path'),fs=require('node:fs');
const {status,prepareAccessReview,createTaskClient}=require('./codex.cjs'),{createStore}=require('./store.cjs');
(async()=>{
  if(process.argv.includes('--inspect-config')){const c=await createTaskClient();try{const {config}=await c.request('config/read',{includeLayers:false});console.log(JSON.stringify({features:config.features,mcp:Object.entries(config.mcp_servers||{}).map(([name,value])=>({name,enabled:value.enabled!==false})),plugins:Object.entries(config.plugins||{}).filter(([,value])=>value.enabled!==false).map(([name])=>name)}));}finally{c.close();}return;}
  if(!process.argv.includes('--run-fictional-task')){console.log(JSON.stringify(await status()));return;}
  const store=createStore(':memory:',{seed:true});
  try{const before=JSON.stringify(store.read()),result=await prepareAccessReview(store);if(JSON.stringify(store.read())!==before)throw Error('The read-only task changed governance data.');const dir=path.resolve(__dirname,'../runtime/test-artifacts/local-application');fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'CODEX_SMOKE.json'),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({status:result.status,model:result.model,tools:result.events,questionCount:result.draft.questions.length,sourceIds:result.draft.source_ids,governanceRecordsChanged:false}));}finally{store.close();}
})().catch(e=>{console.error(e.message);process.exitCode=1;});
