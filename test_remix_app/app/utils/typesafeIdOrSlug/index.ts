/**
 * @description some paths can be either ids, or slugs. for convenience's sake, lets handle that here and make it type-safe
*/
export const typesafeIdOrSlug = (idOrSlug: string): number | string => {
  if (typeof idOrSlug !== 'string') return '';
  const isSlug = isNaN(parseInt(idOrSlug, 10));
  if (!isSlug) return parseInt(idOrSlug, 10);
  return idOrSlug;
};
