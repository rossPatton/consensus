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
    .replace(/\s+|\/+|,+/gm, '-') // spaces and / => -
    .replace(/('|\(|\)|\.)+|#+|'+/gm, '') // '#' and () and ' => ''
    .replace(/-+/gm, '-') // repeating '-'s
    .toLowerCase()
    .trim();
};

// takes output of above, and returns human friendly string
// new-york-city => New York City
export const deSlugify = (string: string): string => {
  if (typeof string !== 'string') return string;

  return string
    .replace(/-+/gm, ' ')
    .split(' ')
    .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(' ')
    .trim();
};
