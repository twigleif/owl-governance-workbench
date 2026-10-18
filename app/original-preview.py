import sys,json,io,base64,tempfile,subprocess,pathlib,warnings
from PIL import Image
from pypdf import PdfReader
import pypdf,PIL
Image.MAX_IMAGE_PIXELS=25000000
warnings.simplefilter('error',Image.DecompressionBombWarning)
try:
    if pypdf.__version__!='6.10.0' or PIL.__version__!='12.3.0':raise ValueError('The original-file parser version changed. Restore the pinned local runtime before checking this file.')
    mode,media,page,poppler=sys.argv[1:5]
    data=sys.stdin.buffer.read(20*1024*1024+1)
    if not data or len(data)>20*1024*1024:raise ValueError('Choose a non-empty file up to 20 MB.')
    if media=='application/pdf':
        if not data.startswith(b'%PDF-') or b'%%EOF' not in data[-2048:]:raise ValueError('This PDF is incomplete or does not match its file type. Choose a valid PDF.')
        pdf=PdfReader(io.BytesIO(data),strict=True)
        if pdf.is_encrypted:raise ValueError('Encrypted PDFs are not supported. Supply an authorized readable copy.')
        pages=len(pdf.pages)
        if not 1<=pages<=2000:raise ValueError('This PDF exceeds the 2,000-page preview limit.')
        if mode=='validate':print(json.dumps({'pages':pages}));sys.exit()
        number=int(page)
        if not 1<=number<=pages:raise ValueError('Choose an available PDF page.')
        with tempfile.TemporaryDirectory(prefix='owl-original-') as folder:
            source=pathlib.Path(folder)/'original.pdf';source.write_bytes(data)
            result=subprocess.run([poppler,'-f',str(number),'-l',str(number),'-scale-to','1100','-singlefile','-png',str(source)],capture_output=True,timeout=12,check=True)
            image=result.stdout
    elif media in ['image/png','image/jpeg']:
        expected='PNG' if media=='image/png' else 'JPEG'
        original=Image.open(io.BytesIO(data))
        if original.format!=expected:raise ValueError('The image bytes do not match its file extension. Choose a valid image.')
        original.verify();pages=1
        if mode=='validate':print(json.dumps({'pages':1}));sys.exit()
        original=Image.open(io.BytesIO(data));original.load();original.thumbnail((1100,1600));buffer=io.BytesIO();original.convert('RGB').save(buffer,format='PNG');image=buffer.getvalue()
    else:
        text=data.decode('utf-8')
        if '\x00' in text:raise ValueError('This file contains binary data. Supply UTF-8 text or a supported document.')
        if mode=='validate':print(json.dumps({'pages':1}));sys.exit()
        print(json.dumps({'text':text}));sys.exit()
    if len(image)>4*1024*1024:raise ValueError('This page exceeds the preview size limit. Download the original to inspect it.')
    print(json.dumps({'base64':base64.b64encode(image).decode(),'pages':pages}))
except Exception as e:
    print(json.dumps({'error':str(e)[:500] or 'The file could not be parsed. Choose a valid supported file.'}));sys.exit(1)
