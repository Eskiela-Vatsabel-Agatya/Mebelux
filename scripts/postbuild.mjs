import fs from 'node:fs'; import path from 'node:path';
const noindex=/\bnoindex\s*:\s*true\b/.test(fs.readFileSync('src/data/site.ts','utf8'));
const dist='dist';
if(noindex){for(const file of fs.readdirSync(dist).filter((name)=>/^sitemap(?:-index)?(?:\d+)?\.xml$/.test(name)))fs.rmSync(path.join(dist,file),{force:true});for(const file of fs.readdirSync(dist).filter((name)=>name.startsWith('sitemap-')))fs.rmSync(path.join(dist,file),{force:true});}
const robots=fs.readFileSync(path.join(dist,'robots.txt'),'utf8');
if(noindex&&!robots.includes('Disallow: /'))throw new Error('noindex enabled but robots.txt does not disallow crawling');
if(!noindex&&!robots.includes('Sitemap:'))throw new Error('Indexing enabled but robots.txt has no sitemap URL');
const verify=[];
function scan(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);if(entry.isDirectory())scan(file);else if(/\.(ts|astro|mjs)$/.test(entry.name)){for(const [index,line] of fs.readFileSync(file,'utf8').split(/\r?\n/).entries())if(/VERIFY/.test(line))verify.push(`${file}:${index+1}: ${line.trim()}`)}}}
scan('src');
console.warn(`VERIFY items (${verify.length}):`); for(const item of verify)console.warn(` - ${item}`);
console.warn('TEMP items: six thumbnail-only projects (Mr. Alvin, Mrs. Anis, Mrs. Risa, Mrs. Widia, Mrs. Gofi, Mr. Wawan); raster logo; generated favicon; generated social card; AWK Office about photo.');
