'use strict';
// The envelope declares extension awareness; features declare the actual readers required.
const SUPPORTED=Object.freeze({'original-files':2,'authoring-documents':1});
const TEAM_TABLES=Object.freeze(['team_users','team_roles','team_grants','team_assignments','team_wizard','team_events','team_operations','team_identity_meta','team_credentials','team_sessions','team_one_time','team_auth_attempts','team_auth_events']);
const supported=({teamMode=false}={})=>teamMode?{...SUPPORTED,'team-identity':1}:SUPPORTED;
const exists=(db,name)=>!!db.prepare("SELECT 1 FROM sqlite_master WHERE type='table' AND name=?").get(name);
function preflight(db,fail,options={}){
 const admitted=supported(options);
 const features=exists(db,'owl_storage_features')?db.prepare('SELECT name,version FROM owl_storage_features ORDER BY name').all():[];
 const team=features.find(f=>f.name==='team-identity');
 // Inspect identity rows before either fresh-workspace early return. They may
 // never be mistaken for harmless empty scaffolding by an older writer.
 for(const name of TEAM_TABLES)if(exists(db,name)&&db.prepare('SELECT 1 FROM ['+name+'] LIMIT 1').get()&&!team)fail('Saved team identity data has no matching storage declaration. Keep this workspace for compatible local recovery.','storage-integrity');
 for(const f of features)if(admitted[f.name]!==f.version)fail('This workspace needs a reader for '+f.name+' version '+f.version+'. No saved work was changed.','storage-version');
 if(team&&!TEAM_TABLES.every(name=>exists(db,name)))fail('Team identity storage is incomplete. Keep this workspace and restore a verified compatible copy; do not recreate missing account or session tables.','storage-integrity');
 if(!exists(db,'app_state')){if(features.length)fail('Storage declarations have no workspace envelope. Keep this workspace for compatible recovery.','storage-integrity');return;}
 const row=db.prepare('SELECT format,body FROM app_state WHERE singleton=1').get();if(!row){if(features.length)fail('Storage declarations have no workspace envelope. Keep this workspace for compatible recovery.','storage-integrity');return;}
 if(![1,2,3].includes(row.format))fail('Unknown application storage version. Use a compatible OWL reader before opening this workspace.','storage-version');
 if(row.format===3&&!features.length||row.format!==3&&features.length)fail('The storage feature declarations do not match this workspace. Keep it and recover a verified compatible copy.','storage-integrity');
 for(const f of features){if(f.name==='original-files'&&!exists(db,'evidence_originals'))fail('Original-file storage is incomplete. Restore a verified compatible copy.','storage-integrity');if(f.name==='authoring-documents'&&!['authoring_documents','authoring_versions','authoring_artifacts'].every(n=>exists(db,n)))fail('Saved document storage is incomplete. Restore the exact workspace from a verified backup.','storage-integrity');}
 for(const name of ['authoring_documents','authoring_versions','authoring_artifacts'])if(exists(db,name)&&db.prepare('SELECT 1 FROM ['+name+'] LIMIT 1').get()&&!features.some(f=>f.name==='authoring-documents'))fail('Saved documents have no matching storage declaration. Keep the workspace for compatible recovery.','storage-integrity');
}
function create(db,fail,options={}){
 const admitted=supported(options);
 db.function('owl_extension_supported',{deterministic:true},(name,version)=>admitted[name]===version?1:0);
 preflight(db,fail,options);
 if(exists(db,'owl_storage_features')&&db.prepare("SELECT 1 FROM owl_storage_features WHERE name='authoring-documents'").get())require('./authoring.cjs').verifyDatabase(db,JSON.parse(db.prepare('SELECT body FROM app_state WHERE singleton=1').get().body),fail,{integrity:false});
 db.exec(`CREATE TABLE IF NOT EXISTS owl_storage_features(name TEXT PRIMARY KEY,version INTEGER NOT NULL);
 CREATE TRIGGER IF NOT EXISTS owl_features_insert BEFORE INSERT ON owl_storage_features BEGIN SELECT CASE WHEN owl_extension_supported(NEW.name,NEW.version)!=1 THEN RAISE(ABORT,'Unsupported OWL storage feature') END; END;
 CREATE TRIGGER IF NOT EXISTS owl_features_update BEFORE UPDATE ON owl_storage_features BEGIN SELECT RAISE(ABORT,'Storage features cannot be changed'); END;
 CREATE TRIGGER IF NOT EXISTS owl_features_delete BEFORE DELETE ON owl_storage_features BEGIN SELECT RAISE(ABORT,'Storage features cannot be removed'); END;`);
 function guard(){for(const {name}of db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'").all()){if(!/^\w+$/.test(name))fail('Unsupported storage table.','storage-version');for(const event of ['INSERT','UPDATE','DELETE'])db.exec(`CREATE TRIGGER IF NOT EXISTS owl_features_${name}_${event} BEFORE ${event} ON [${name}] BEGIN SELECT CASE WHEN EXISTS(SELECT 1 FROM owl_storage_features WHERE owl_extension_supported(name,version)!=1) THEN RAISE(ABORT,'Use a compatible OWL feature reader before writing') END; END;`);}}
 function activate(name){if(!db.isTransaction)fail('Storage activation requires the shared Save transaction.','storage-integrity');if(!admitted[name])fail('Unsupported storage feature.','storage-version');guard();db.prepare('INSERT OR IGNORE INTO owl_storage_features VALUES(?,?)').run(name,admitted[name]);if(exists(db,'evidence_originals')&&db.prepare('SELECT 1 FROM evidence_originals LIMIT 1').get())db.prepare("INSERT OR IGNORE INTO owl_storage_features VALUES('original-files',2)").run();db.prepare('UPDATE app_state SET format=MAX(format,3) WHERE singleton=1').run();}
 return{activate,guard,features:()=>db.prepare('SELECT name,version FROM owl_storage_features ORDER BY name').all()};
}
module.exports={SUPPORTED,TEAM_TABLES,exists,preflight,create};
