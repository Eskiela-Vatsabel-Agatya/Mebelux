"""Extract only the documented Mebelux source images from the supplied PDFs."""
from pathlib import Path
from pypdf import PdfReader
from PIL import Image
import io

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "work" / "mebelux-source" / "DOCS FOR MEBELUX"
OUT = ROOT / "src" / "assets"

def images(pdf_name, page_index):
    return [Image.open(io.BytesIO(image.data)).convert("RGB")
            for image in PdfReader(DOCS / pdf_name).pages[page_index].images]

def save(image, path, quality=84):
    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, "JPEG", quality=quality, optimize=True, progressive=True)

landing = "mebeluxfurniture landing page.pdf"
for page_index, names in [(1, ["Kitchen Set", "Backdrop TV", "Bedroom"]),
                          (2, ["Walk In Closet", "Dining Room", "Kabinet Storage"])]:
    candidates = [im for im in images(landing, page_index) if im.width == 1536 and im.height == 2048]
    if len(candidates) != 3:
        raise RuntimeError(f"Expected 3 service images on page {page_index+1}, got {len(candidates)}")
    for index, image in enumerate(candidates, 1):
        save(image, OUT / "services" / f"svc-{(page_index-1)*3+index}.jpg")

logo = [im for im in images(landing, 3) if im.size == (586, 138)]
if len(logo) != 1:
    raise RuntimeError("Expected exactly one 586x138 raster logo")
save(logo[0], OUT / "brand" / "logo-raster.jpg", 92)

teaser = [im for im in images(landing, 5) if im.width >= 1200 and im.height >= 1600]
if len(teaser) != 8:
    raise RuntimeError(f"Expected 8 gallery teaser photos, got {len(teaser)}")
for index, image in enumerate(teaser, 1):
    save(image, OUT / "gallery-teaser" / f"g-{index}.jpg")

gallery_name = "Galery Mebelux.pdf"
gallery = PdfReader(DOCS / gallery_name)
project_slugs = [["mr-alvin", "mrs-anis", "mrs-risa", "mrs-widia"],
                 [None, "mrs-gofi", "mr-wawan", None]]
for page_index, page in enumerate(gallery.pages):
    candidates = [Image.open(io.BytesIO(item.data)).convert("RGB") for item in page.images
                  if Image.open(io.BytesIO(item.data)).size in {(440, 540), (354, 434)}]
    covers = [im for im in candidates if im.size == (440, 540)]
    second = [im for im in candidates if im.size == (354, 434)]
    if len(covers) != 4 or len(second) != 4:
        raise RuntimeError(f"Unexpected gallery thumbnails on page {page_index+1}")
    slugs = project_slugs[page_index]
    for offset, slug in enumerate(slugs):
        if slug is None:  # Full-resolution AWK Office and Mrs. Yati photos are supplied separately.
            continue
        # PDF paint order pairing is a best guess and is flagged VERIFY in project docs.
        save(covers[offset], OUT / "projects" / slug / "temp-1.jpg", 82)
        save(second[offset], OUT / "projects" / slug / "temp-2.jpg", 82)

print("Extracted 6 service photos, logo, 8 gallery photos, and 12 temporary gallery thumbnails.")
