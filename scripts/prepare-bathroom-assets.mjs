import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const source=new URL('../public/images/designs/pichcha/',import.meta.url);
const output=new URL('../public/images/bathroom-tour/',import.meta.url);
await mkdir(output,{recursive:true});
for(const name of ['cover','long-vanity','shower-cubicle','water-closet-focus']){
  const input=new URL(`pichcha-${name}-v2.webp`,source);
  const inputStat=await stat(input);
  for(const width of [640,1024,1440]){
    const destination=new URL(`${name}-${width}.webp`,output);
    const existing=await stat(destination).catch(()=>null);
    if(existing&&existing.mtimeMs>=inputStat.mtimeMs)continue;
    await sharp(fileURLToPath(input)).resize({width,withoutEnlargement:true}).webp({quality:76,effort:5}).toFile(fileURLToPath(destination));
  }
}
console.log('Prepared responsive bathroom posters (640, 1024, 1440px).');
