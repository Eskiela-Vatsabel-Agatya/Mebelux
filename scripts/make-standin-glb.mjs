import fs from 'node:fs';
import path from 'node:path';
const output = path.resolve('public/model/mrs-yati.glb'); fs.mkdirSync(path.dirname(output), { recursive:true });
// Simple U-shaped kitchen shell for local wiring checks only. Dimensions in meters, Y-up, floor-centered.
const positions = new Float32Array([
 -1.5,0,-1, 1.5,0,-1, 1.5,2.2,-1, -1.5,2.2,-1,
 -1.5,0,1, -1.5,0,-1, -1.5,2.2,-1, -1.5,2.2,1,
 -1.5,0,-1, 1.5,0,-1, 1.5,0,1, -1.5,0,1,
 -1.5,0,1, -1.5,2.2,1, 1.5,2.2,1, 1.5,0,1,
 1.5,0,-1, 1.5,0,1, 1.5,2.2,1, 1.5,2.2,-1,
 -1.3,0.9,-0.95, 1.3,0.9,-0.95, 1.3,0.98,-0.95, -1.3,0.98,-0.95
 ]);
const indices = new Uint16Array([0,1,2,0,2,3,4,5,6,4,6,7,8,9,10,8,10,11,12,13,14,12,14,15,16,17,18,16,18,19,20,21,22,20,22,23]);
const p = Buffer.from(positions.buffer); const ix = Buffer.from(indices.buffer); const pad = (b,n) => Buffer.concat([b,Buffer.alloc((4-b.length%4)%4,n)]);
const pOffset=0, iOffset=(p.length+3)&~3; const bin=Buffer.concat([p,Buffer.alloc(iOffset-p.length),ix]);
const json={asset:{version:'2.0',generator:'Mebelux local stand-in only'},scene:0,scenes:[{nodes:[0]}],nodes:[{mesh:0}],meshes:[{primitives:[{attributes:{POSITION:0},indices:1,material:0}]}],materials:[{name:'Neutral temporary material',pbrMetallicRoughness:{baseColorFactor:[0.78,0.76,0.7,1],metallicFactor:0,roughnessFactor:0.85},doubleSided:true}],buffers:[{byteLength:bin.length}],bufferViews:[{buffer:0,byteOffset:pOffset,byteLength:p.length,target:34962},{buffer:0,byteOffset:iOffset,byteLength:ix.length,target:34963}],accessors:[{bufferView:0,componentType:5126,count:positions.length/3,type:'VEC3',min:[-1.5,0,-1],max:[1.5,2.2,1]},{bufferView:1,componentType:5123,count:indices.length,type:'SCALAR'}]};
const js=pad(Buffer.from(JSON.stringify(json)),0x20); const binPadded=pad(bin,0); const total=12+8+js.length+8+binPadded.length;
const glb=Buffer.alloc(total);glb.write('glTF',0);glb.writeUInt32LE(2,4);glb.writeUInt32LE(total,8);glb.writeUInt32LE(js.length,12);glb.writeUInt32LE(0x4e4f534a,16);js.copy(glb,20);const bp=20+js.length;glb.writeUInt32LE(binPadded.length,bp);glb.writeUInt32LE(0x004e4942,bp+4);binPadded.copy(glb,bp+8);fs.writeFileSync(output,glb);console.log(`Wrote ignored local stand-in: ${output} (${glb.length} bytes)`);
