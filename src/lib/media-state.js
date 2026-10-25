export function mediaStateFor(project, modelStatus) {
  const hasPhotos = Array.isArray(project?.photos) && project.photos.length > 0;
  const hasModel = Boolean(project?.model);
  if (hasModel && modelStatus === 'failed') return 'fallback';
  if (hasModel && hasPhotos) return 'model+photos';
  if (hasModel) return 'model';
  if (hasPhotos) return 'photos';
  return 'fallback';
}
