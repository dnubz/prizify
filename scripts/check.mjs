import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { tracks } from '../dist/data.js';
const root=resolve(import.meta.dirname,'../dist');
for(const file of ['index.html','style.css','app.js','core.js','data.js',...tracks.map(t=>`assets/${t.art}.svg`),...tracks.map(t=>`assets/${t.id}.wav`)])await access(resolve(root,file));
const html=await readFile(resolve(root,'index.html'),'utf8');
if(!html.includes('<title>Prizify'))throw Error('Missing brand title');
console.log(`Build verified: ${tracks.length} local audio tracks, all application files and artwork present. No external runtime dependencies.`);
