import fs from 'node:fs';
const css=fs.readFileSync('src/styles/tokens.css','utf8'); const vars=Object.fromEntries([...css.matchAll(/(--[\w-]+)\s*:\s*(#[0-9a-fA-F]{6})/g)].map((m)=>[m[1],m[2]]));
function lum(hex){const vals=hex.slice(1).match(/../g).map((x)=>parseInt(x,16)/255).map((c)=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4);return .2126*vals[0]+.7152*vals[1]+.0722*vals[2]}
function ratio(a,b){const x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)}
const pairs=[['body text','--ink','--surface',4.5],['secondary text','--ink-muted','--surface',4.5],['large heading','--ink','--surface',3],['primary button','--ink','--brand-500',4.5],['WhatsApp button','--white','--whatsapp',4.5],['control border','--border-control','--surface',3],['focus ring','--brand-800','--surface',3],['raised control border','--border-control','--surface-raised',3],['inset control border','--border-control','--surface-inset',3]];
let failed=false;for(const [label,fg,bg,min] of pairs){const value=ratio(vars[fg],vars[bg]);console.log(`${label.padEnd(22)} ${value.toFixed(2)}:1 (minimum ${min}:1)`);if(value<min)failed=true}if(failed)process.exit(1);
