import alvin1 from '../assets/projects/mr-alvin/temp-1.jpg'; import alvin2 from '../assets/projects/mr-alvin/temp-2.jpg';
import anis1 from '../assets/projects/mrs-anis/temp-1.jpg'; import anis2 from '../assets/projects/mrs-anis/temp-2.jpg';
import risa1 from '../assets/projects/mrs-risa/temp-1.jpg'; import risa2 from '../assets/projects/mrs-risa/temp-2.jpg';
import widia1 from '../assets/projects/mrs-widia/temp-1.jpg'; import widia2 from '../assets/projects/mrs-widia/temp-2.jpg';
import gofi1 from '../assets/projects/mrs-gofi/temp-1.jpg'; import gofi2 from '../assets/projects/mrs-gofi/temp-2.jpg';
import wawan1 from '../assets/projects/mr-wawan/temp-1.jpg'; import wawan2 from '../assets/projects/mr-wawan/temp-2.jpg';
import awk1 from '../assets/projects/awk-office/awk-1.jpg'; import awk2 from '../assets/projects/awk-office/awk-2.jpg'; import awk3 from '../assets/projects/awk-office/awk-3.jpg'; import awk4 from '../assets/projects/awk-office/awk-4.jpg'; import awk5 from '../assets/projects/awk-office/awk-5.jpg';
import yati1 from '../assets/projects/mrs-yati/yati-1.jpg'; import yati2 from '../assets/projects/mrs-yati/yati-2.jpg'; import yati3 from '../assets/projects/mrs-yati/yati-3.jpg'; import yati4 from '../assets/projects/mrs-yati/yati-4.jpg';
type Photo = { src: ImageMetadata; alt: string; temp?: boolean };
export type Project = { slug:string; name:string; kind:'residential'|'commercial'; photos:Photo[]; details?:Partial<Record<'ruang'|'lokasi'|'tahun'|'material'|'dimensi'|'deskripsi',string>> };
const tmp=(src:ImageMetadata, n:number):Photo=>({src,alt:`Foto proyek interior Mebelux, tampilan ${n}`,temp:true});
export const projects:Project[] = [
  {slug:'mr-alvin',name:'Mr. Alvin',kind:'residential',photos:[tmp(alvin1,1),tmp(alvin2,2)]},
  {slug:'mrs-anis',name:'Mrs. Anis',kind:'residential',photos:[tmp(anis1,1),tmp(anis2,2)]},
  {slug:'mrs-risa',name:'Mrs. Risa',kind:'residential',photos:[tmp(risa1,1),tmp(risa2,2)]},
  {slug:'mrs-widia',name:'Mrs. Widia',kind:'residential',photos:[tmp(widia1,1),tmp(widia2,2)]},
  {slug:'awk-office',name:'AWK Office',kind:'commercial',photos:[
    {src:awk1,alt:'Interior AWK Office Mebelux dengan kabinet dan area kerja'}, {src:awk2,alt:'Interior AWK Office Mebelux, detail ruang kantor'}, {src:awk3,alt:'Interior AWK Office Mebelux, detail furnitur'}, {src:awk4,alt:'Interior AWK Office Mebelux, tampilan ruang'}, {src:awk5,alt:'Interior AWK Office Mebelux, detail penyimpanan'},
  ]},
  {slug:'mrs-gofi',name:'Mrs. Gofi',kind:'residential',photos:[tmp(gofi1,1),tmp(gofi2,2)]},
  {slug:'mr-wawan',name:'Mr. Wawan',kind:'residential',photos:[tmp(wawan1,1),tmp(wawan2,2)]},
  {slug:'mrs-yati',name:'Mrs. Yati',kind:'residential',photos:[
    {src:yati1,alt:'Kitchen set berbentuk L dengan kabinet putih, countertop gelap, dan dinding merah muda'}, {src:yati2,alt:'Kitchen set Mebelux dengan kabinet atas terbuka dan countertop gelap'}, {src:yati3,alt:'Detail kitchen set putih Mebelux dan permukaan countertop'}, {src:yati4,alt:'Tampilan lain kitchen set Mebelux dengan kabinet putih'},
  ]},
];
