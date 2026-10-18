'use strict';
const MAX_TOTAL=200*1024*1024;
function usage(db){let n=0;const has=name=>db.prepare("SELECT 1 FROM sqlite_master WHERE type='table' AND name=?").get(name);if(has('evidence_originals'))n+=db.prepare('SELECT coalesce(sum(bytes),0) n FROM evidence_originals').get().n;if(has('authoring_versions'))n+=db.prepare('SELECT coalesce(sum(length(capsule)+length(html)),0) n FROM authoring_versions').get().n;return n;}
function check(db,extra,fail){if(!Number.isSafeInteger(extra)||extra<0||usage(db)+extra>MAX_TOTAL)fail('This workspace has reached the 200 MB source-content limit. Existing files and drafts are kept. Review storage before adding another version.','source-quota');}
module.exports={MAX_TOTAL,usage,check};
