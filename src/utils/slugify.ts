/**
 * spaces => dashes. url unfriendly characters removed (().')
 * Emergency Contraception => emergency-contraception
 * alzheimer's disease => alzheimers-disease
 * high-calcium-(hypercalcemia)-from-cancer => high-calcium-hypercalcemia-from-cancer
 * c.-diff-infection => c-diff-infection
 */
export const slugify = (string: string): string => {
  if (typeof string !== 'string') return string;

  return string
    .replace(/\s+|\/+/gm, '-') // spaces and / => -
    .replace(/('|\(|\)|\.)+|#+|'+/gm, '') // '#' and () and ' => ''
    .replace(/-+/gm, '-') // repeating '-'s
    .toLowerCase()
    .trim();
};
