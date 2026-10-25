import assert from 'node:assert/strict';
import { mediaStateFor } from '../src/lib/media-state.js';
const photos=[{}];
assert.equal(mediaStateFor({photos,model:{}}),'model+photos');
assert.equal(mediaStateFor({photos},undefined),'photos');
assert.equal(mediaStateFor({photos:[],model:{}}),'model');
assert.equal(mediaStateFor({photos,model:{}},'failed'),'fallback');
assert.equal(mediaStateFor({photos:[]},undefined),'fallback');
console.log('Media states pass.');
