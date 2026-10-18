import {writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
const assets=resolve(import.meta.dirname,'../dist/assets');
for(const [family,key,weight] of [['DM Sans','dm-sans','400..700'],['Manrope','manrope','400..800']]){
 const css=await fetch(`https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&display=swap`,{headers:{'User-Agent':'Mozilla/5.0 Chrome/130.0.0.0 Safari/537.36'}}).then(r=>{if(!r.ok)throw Error('Font request failed');return r.text();});
 const blocks=css.split('/* latin */');const latin=blocks.at(-1);const url=/src:\s*url\(([^)]+)\)/.exec(latin)?.[1];if(!url)throw Error('Missing font source');
 const response=await fetch(url);if(!response.ok)throw Error('Font download failed');await writeFile(resolve(assets,`${key}.woff2`),Buffer.from(await response.arrayBuffer()));
 const license=await fetch(`https://raw.githubusercontent.com/google/fonts/main/ofl/${key.replaceAll('-','')}/OFL.txt`).then(r=>{if(!r.ok)throw Error('Font license unavailable');return r.text();});await writeFile(resolve(assets,`${key}-OFL.txt`),license);
}
console.log('Vendored Latin variable fonts and SIL Open Font licenses.');
