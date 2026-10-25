import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
const root=process.cwd(); const logo=fs.readFileSync(path.join(root,'src/assets/brand/logo-raster.jpg')); const tokens=fs.readFileSync(path.join(root,'src/styles/tokens.css'),'utf8');
const color=(name)=>tokens.match(new RegExp(`${name}\\s*:\\s*(#[0-9a-fA-F]{6})`))?.[1];
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="${color('--surface')}"/><rect x="48" y="48" width="1104" height="534" rx="36" fill="${color('--surface-raised')}"/><text x="600" y="400" text-anchor="middle" font-family="Arial,sans-serif" font-size="36" fill="${color('--ink')}">Mewujudkan Ruang Impian dengan Sentuhan Personal.</text></svg>`;
const logoBuffer=await sharp(logo).resize({width:560,fit:'inside'}).png().toBuffer();
await sharp(Buffer.from(svg)).composite([{input:logoBuffer,left:320,top:120}]).png().toFile(path.join(root,'public/og-default.png'));
console.log('TEMP social card generated at 1200x630.');
