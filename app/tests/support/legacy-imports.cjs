'use strict';
const path=require('node:path'),{createRequire}=require('node:module');

// Historical fixture import identifiers stay unchanged; only their physical location moves.
const nativeImportAliases=Object.freeze({
  '../prototypes/src/assessment-core.js':'assessment-core.js',
  '../prototypes/src/assessment-schema.js':'assessment-schema.js',
  '../prototypes/src/docent-working-case.cjs':'docent-working-case.cjs',
  '../prototypes/src/document-core.js':'document-core.js',
  '../prototypes/src/document-template-registry.js':'document-template-registry.js',
  '../prototypes/src/reference-schema.js':'reference-schema.js',
  '../prototypes/src/register-core.js':'register-core.js'
});
const coreRoot=path.resolve(__dirname,'../../core');
function createLegacyRequire(filename){
  const nativeRequire=createRequire(filename);
  return id=>{
    if(Object.hasOwn(nativeImportAliases,id))return nativeRequire(path.join(coreRoot,nativeImportAliases[id]));
    if(id.startsWith('../prototypes/src/'))throw Error('Unsupported historical native import: '+id);
    return nativeRequire(id);
  };
}
module.exports={createLegacyRequire,nativeImportAliases};
