// safer lowercase string method than the default
// generally, i prefer getting back an empty string instead of a TypeError
export const lowerCase = (s: string): string => {
  if (typeof s !== 'string') return '';
  return s.toLowerCase();
};

export const upperCase = (s: string): string => {
  if (typeof s !== 'string') return '';
  return s.toUpperCase();
};

/**
 * spaces => dashes. url unfriendly characters removed (().')
 * Tech Worker's Coalition(NYC) => tech-workers-coalition-nyc
 */
export const slugify = (string: string): string => {
  if (typeof string !== 'string') return '';

  return string
    .replace(/\s+|\/+|,+/gm, '-') // spaces and / => -
    .replace(/('|\(|\)|\.|<|>)+|#+|'+/gm, '') // '#' and () and ' and <> => ''
    .replace(/-+/gm, '-') // repeating '-'s
    .toLowerCase()
    .trim();
};

/**
 * takes slugified output, returns human friendly string
 * new-york-city => New York City
*/
export const deSlugify = (string: string): string => {
  if (typeof string !== 'string') return '';

  return string
    .replace(/-+/gm, ' ')
    .split(' ')
    .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(' ')
    .trim();
};
