'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),crypto=require('node:crypto'),fs=require('node:fs'),path=require('node:path');
const contract=require('./fixtures/runtime-contract.json');
const sha=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');

test('Application-owned sources retain the native seed and historical PDF identity',()=>{
  const seed=require('../core/docent-working-case.cjs').create().nativeFixture.workspace;
  assert.equal(sha(JSON.stringify(seed)),contract.nativeSeedSha256);
  const actual=require('../pdf-service.cjs').rendererIdentity();
  assert.deepEqual({id:actual.id,reportlab:actual.reportlab,codeHashes:actual.codeHashes},contract.reportTemplate);
});

test('Current application asset URLs retain their exact HTML, CSS, scripts, image and sample-PDF bytes',async()=>{
  const archive=path.resolve(__dirname,'../../prototypes').toLowerCase()+path.sep,read=fs.readFileSync;
  const archived=file=>typeof file==='string'&&(path.resolve(file).toLowerCase()+path.sep).startsWith(archive);
  fs.readFileSync=function(file,...args){assert(!archived(file),'Application runtime must not read local design sources: '+file);return read.call(this,file,...args);};
  let app;
  try{
    app=require('../server.cjs').createServer({database:':memory:',seed:true,agent:{status:async()=>({connected:false})}});
    const url=await app.listen(0);
    for(const asset of contract.assets){
      const response=await fetch(url+asset.url);
      assert.equal(response.status,200,asset.url);
      assert.equal(response.headers.get('content-type').split(';')[0],asset.contentType,asset.url);
      let bytes=Buffer.from(await response.arrayBuffer());
      if(asset.sessionTokenPlaceholder){
        const html=bytes.toString('utf8'),match=html.match(/name="owl-session" content="([^"]+)"/);
        assert(match,'The session marker remains available.');
        bytes=Buffer.from(html.replace(match[1],asset.sessionTokenPlaceholder));
      }
      assert.equal(bytes.length,asset.sourceBytes,asset.url);
      assert.equal(sha(bytes),asset.sourceSha256,asset.url);
    }
    assert(!Object.keys(require.cache).some(archived),'Application runtime must not import local design modules.');
  }finally{try{await app?.close();}finally{fs.readFileSync=read;}}
});
