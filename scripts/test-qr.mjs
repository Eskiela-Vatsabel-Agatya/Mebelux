import fs from 'node:fs'; import sharp from 'sharp'; import jsQR from 'jsqr';
const base=process.env.PUBLIC_SITE_URL||'http://localhost:4321';
const slugs=['mr-alvin','mrs-anis','mrs-risa','mrs-widia','awk-office','mrs-gofi','mr-wawan','mrs-yati'];
for(const slug of slugs){const file=`dist/qr/${slug}.svg`;if(!fs.existsSync(file))throw new Error(`Missing QR route ${file}`);const svg=fs.readFileSync(file);if(!svg.toString().includes('viewBox'))throw new Error(`Invalid QR SVG ${file}`);const {data,info}=await sharp(svg).resize(640,640,{fit:'contain',background:'#ffffff'}).ensureAlpha().raw().toBuffer({resolveWithObject:true});const decoded=jsQR(new Uint8ClampedArray(data),info.width,info.height);const expected=new URL(`/gallery-proyek/${slug}/`,base).toString();if(decoded?.data!==expected)throw new Error(`QR decode failed: ${slug} ${decoded?.data||'no payload'}`)}
console.log(`All ${slugs.length} QR codes decode to their project URLs.`);
