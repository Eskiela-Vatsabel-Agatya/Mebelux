"""Pixel-sample the supplied mark and hero mockup; no visual review is performed."""
from collections import Counter
from pathlib import Path
import re
from PIL import Image
import pdfplumber

ROOT=Path(__file__).resolve().parents[1]
DOCS=ROOT/'work'/'mebelux-source'/'DOCS FOR MEBELUX'
def quantized_mode(image, predicate, step=8):
    pixels=[pixel for pixel in image.convert('RGB').getdata() if predicate(pixel)]
    counts=Counter(tuple((channel//step)*step for channel in pixel) for pixel in pixels)
    return '#'+''.join(f'{channel:02X}' for channel in counts.most_common(1)[0][0]),len(pixels),counts.most_common(1)[0][1]

logo=Image.open(ROOT/'src/assets/brand/logo-raster.jpg')
yellow,n_yellow,yellow_count=quantized_mode(logo,lambda p:p[0]>150 and p[1]>70 and p[2]<150 and p[0]-p[2]>80)
mockup=Image.open(DOCS/'mebelux hero section.png').convert('RGB'); w,h=mockup.size
surface,n_surface,surface_count=quantized_mode(mockup.crop((0,0,w,int(h*.14))),lambda p:max(p)-min(p)<4 and 180<=p[0]<=245,step=4)
svg=(DOCS/'logo-about.svg').read_text(encoding='utf-8')
match=re.search(r'--ink-slate\s*,\s*(#[0-9A-Fa-f]{6})',svg)
if not match: raise RuntimeError('Could not find the supplied logo SVG dark-slate fallback')
ink=match.group(1).upper()
pdf=pdfplumber.open(DOCS/'mebeluxfurniture landing page.pdf')
render=pdf.pages[3].to_image(resolution=120).original.convert('RGB')
dark,n_dark,dark_count=quantized_mode(render,lambda p:max(p)<120 and max(p)-min(p)<35,step=4)
print(f'brand yellow: {yellow} (mode of {yellow_count}/{n_yellow} saturated-yellow logo pixels, 8-level bins)')
print(f'hero surface: {surface} (mode of {surface_count}/{n_surface} near-neutral pixels in the mockup top 14%, 4-level bins)')
print(f'heading ink: {ink} (explicit dark-slate token fallback in supplied logo SVG; rendered landing PDF page 4 cross-check dark-pixel mode: {dark}, {dark_count}/{n_dark})')
