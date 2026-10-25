export const site = {
  name: 'Mebelux Furniture', legalName: 'PT. Laras Indah Karya',
  tagline: 'Mewujudkan Ruang Impian dengan Sentuhan Personal.',
  address: 'Jl. Letjen Suprapto No.65, Sumber, Kec. Banjarsari, Kota Surakarta, Jawa Tengah 57138',
  whatsapp: { display: '0818 838 384', wa: '62818838384' }, // VERIFY: confirmed in provided live-site research; prospect demo.
  social: { instagram: 'https://www.instagram.com/mebeluxfurniture/', facebook: null, tiktok: null },
  nav: [
    { label: 'Home', href: '#home', section: 'home' }, { label: 'Services', href: '#services', section: 'services' },
    { label: 'About', href: '#about', section: 'about' }, { label: 'Reviews', href: '#reviews', section: 'reviews' },
    { label: 'Why Us', href: '#why-us', section: 'why-us' }, { label: 'Contact', href: '#contact-cta', section: 'contact-cta' },
  ],
  credit: true, noindex: false, hours: undefined, // VERIFY: hours intentionally omitted from public content and JSON-LD.
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Jl.%20Letjen%20Suprapto%20No.65%2C%20Sumber%2C%20Kec.%20Banjarsari%2C%20Kota%20Surakarta%2C%20Jawa%20Tengah%2057138',
  baseUrl: import.meta.env.PUBLIC_SITE_URL || 'http://localhost:4321',
};
export const waLink = (message: string) => `https://wa.me/${site.whatsapp.wa}?text=${encodeURIComponent(message)}`;
export const genericMessage = 'Halo Mebelux Furniture, saya ingin konsultasi mengenai furniture custom.';
