const cards = [...document.querySelectorAll<HTMLElement>('[data-model-card]')];
for (const card of cards) {
  const viewer = card.querySelector('model-viewer') as (HTMLElement & { canActivateAR?: boolean }) | null;
  if (!viewer) continue;
  const status = card.querySelector<HTMLElement>('[data-model-message]')!;
  const fallback = card.querySelector<HTMLElement>('[data-model-fallback]')!;
  const announcer = card.querySelector<HTMLElement>('[data-model-announcer]')!;
  const ar = card.querySelector<HTMLButtonElement>('[data-ar-button]')!;
  const chip = card.querySelector<HTMLElement>('[data-model-chip]')!;
  let started = false;
  let timer: number | undefined;
  const set = (state: 'loading' | 'ready' | 'failed') => {
    card.dataset.modelStatus = state;
    card.dataset.mediaState = mediaStateFor({ photos: card.querySelector('.model-poster') ? [{}] : [], model: {} }, state);
    if (card.parentElement?.matches('.showcase')) card.parentElement.dataset.state = state;
    if (state === 'loading') { status.textContent = 'Memuat model 3D…'; fallback.hidden = true; ar.hidden = true; chip.hidden = true; }
    if (state === 'ready') { status.textContent = 'Model 3D siap. Geser untuk memutar.'; announcer.textContent = status.textContent; fallback.hidden = true; chip.hidden = false; ar.hidden = !viewer.canActivateAR; }
    if (state === 'failed') { status.textContent = 'Model 3D tidak tersedia. Foto proyek tetap dapat dilihat.'; announcer.textContent = status.textContent; fallback.hidden = false; ar.hidden = true; chip.hidden = true; }
  };
  const start = async () => {
    if (started) return; started = true; set('loading');
    timer = window.setTimeout(() => set('failed'), 15000);
    try {
      await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
      await import('@google/model-viewer');
      viewer.addEventListener('load', () => { if (timer) clearTimeout(timer); set('ready'); }, { once: true });
      viewer.addEventListener('error', () => { if (timer) clearTimeout(timer); set('failed'); }, { once: true });
      viewer.setAttribute('src', card.dataset.glb!); viewer.setAttribute('ios-src', card.dataset.usdz!);
    } catch { if (timer) clearTimeout(timer); set('failed'); }
  };
  let observer: IntersectionObserver | null = null;
  if ('IntersectionObserver' in window) observer = new IntersectionObserver((entries) => { if (entries.some((entry) => entry.isIntersecting)) { observer?.disconnect(); void start(); } }, { rootMargin: '200px' });
  if (observer) observer.observe(card); else window.setTimeout(() => void start(), 1000);
  card.querySelector('[data-model-retry]')?.addEventListener('click', () => { started = false; viewer.removeAttribute('src'); void start(); });
}
import { mediaStateFor } from '../lib/media-state.js';
