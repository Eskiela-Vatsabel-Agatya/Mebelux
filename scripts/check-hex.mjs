import fs from 'node:fs'; import path from 'node:path';
const root=process.cwd(); const allowed=new Set(['src/styles/tokens.css','src/assets/brand/favicon.svg','public/favicon.svg','src/pages/qr/[slug].svg.ts','scripts/test-qr.mjs']); const errors=[];
function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const full=path.join(dir,entry.name);if(entry.isDirectory())walk(full);else if(/\.(css|astro|ts|js|mjs|svg|html)$/.test(entry.name)){const rel=path.relative(root,full).replaceAll('\\','/');if(allowed.has(rel))continue;const text=fs.readFileSync(full,'utf8');for(const match of text.matchAll(/#(?:[0-9a-fA-F]{3,8})\b/g))errors.push(`${rel}: ${match[0]}`)}}}
for(const dir of ['src','scripts','public'])if(fs.existsSync(path.join(root,dir)))walk(path.join(root,dir));
if(errors.length){console.error('Hex colors outside approved sources:\n'+errors.join('\n'));process.exit(1)}console.log('Hex check passed: color literals are confined to approved sources.');
