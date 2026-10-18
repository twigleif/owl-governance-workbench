'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {DatabaseSync}=require('node:sqlite');
const Storage=require('../storage-capabilities.cjs');
const fail=(message,code)=>{throw Object.assign(Error(message),{code});};
function database({envelope=true,emptyEnvelope=false,active=false,missing=null}={}){
 const db=new DatabaseSync(':memory:');
 if(envelope){db.exec('CREATE TABLE app_state(singleton INTEGER PRIMARY KEY,format INTEGER,body TEXT,meta TEXT)');if(!emptyEnvelope)db.prepare('INSERT INTO app_state VALUES(1,?,?,?)').run(active?3:1,'{"native":"preserve this exact body"}','{"private":"preserve this exact metadata"}');}
 db.exec('CREATE TABLE owl_storage_features(name TEXT PRIMARY KEY,version INTEGER NOT NULL)');
 for(const name of Storage.TEAM_TABLES)if(name!==missing)db.exec('CREATE TABLE ['+name+'](id TEXT)');
 if(active)db.prepare('INSERT INTO owl_storage_features VALUES(?,?)').run('team-identity',1);
 return db;
}
function snapshot(db){return db.prepare("SELECT type,name,tbl_name,sql FROM sqlite_master WHERE name NOT LIKE 'sqlite_%' ORDER BY type,name").all().map(row=>({...row,...(row.type==='table'?{rows:db.prepare('SELECT * FROM ['+row.name+']').all()}:{} )}));}
function unchangedRefusal(db,fn,code){const before=snapshot(db);assert.throws(fn,error=>error.code===code);assert.deepEqual(snapshot(db),before);}

test('legacy reader refuses an activated team workspace before any schema or row write',()=>{
 const db=database({active:true});
 try{unchangedRefusal(db,()=>Storage.create(db,fail),'storage-version');assert.equal(db.prepare('SELECT body FROM app_state').get().body,'{"native":"preserve this exact body"}');}finally{db.close();}
});

test('active team feature requires every identity and metadata table, before any repair writer runs',()=>{
 for(const name of Storage.TEAM_TABLES){const db=database({active:true,missing:name});try{unchangedRefusal(db,()=>Storage.create(db,fail,{teamMode:true}),'storage-integrity');assert.equal(Storage.exists(db,name),false);}finally{db.close();}}
});

test('populated undeclared team tables refuse before app_state absence and empty-envelope returns',()=>{
 for(const envelope of [false,true])for(const emptyEnvelope of [false,true])for(const name of Storage.TEAM_TABLES){const db=database({envelope,emptyEnvelope});try{db.prepare('INSERT INTO ['+name+'] VALUES(?)').run('retained-technical-row');unchangedRefusal(db,()=>Storage.create(db,fail,{teamMode:true}),'storage-integrity');}finally{db.close();}}
});

test('empty unactivated team scaffolding is safe for a fresh or existing legacy workspace',()=>{
 for(const options of [{envelope:false},{emptyEnvelope:true},{}]){const db=database(options);try{Storage.preflight(db,fail);Storage.preflight(db,fail,{teamMode:true});const before=db.prepare('SELECT name,version FROM owl_storage_features').all();Storage.create(db,fail,{teamMode:true});assert.deepEqual(db.prepare('SELECT name,version FROM owl_storage_features').all(),before);for(const name of Storage.TEAM_TABLES)assert.equal(db.prepare('SELECT count(*) AS n FROM ['+name+']').get().n,0);if(options.envelope!==false&&!options.emptyEnvelope)assert.equal(db.prepare('SELECT body FROM app_state').get().body,'{"native":"preserve this exact body"}');}finally{db.close();}}
});

test('compatible preflight preserves the exact native payload and accepts a complete activated schema',()=>{
 const db=database({active:true});try{const before=snapshot(db);Storage.preflight(db,fail,{teamMode:true});assert.deepEqual(snapshot(db),before);assert.equal(Storage.TEAM_TABLES.length,13);}finally{db.close();}
});

test('a declared team feature without a workspace envelope refuses compatible startup without mutation',()=>{
 for(const options of [{envelope:false},{emptyEnvelope:true}]){const db=database({...options,active:true});try{unchangedRefusal(db,()=>Storage.create(db,fail,{teamMode:true}),'storage-integrity');}finally{db.close();}}
});
