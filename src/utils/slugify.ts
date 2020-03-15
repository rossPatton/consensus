/**
 * spaces => dashes. url unfriendly characters removed (().')
 * Tech Worker's Coalition(NYC) => tech-workers-coalition-nyc
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

/**
 * takes slugified output, returns human friendly string
 * new-york-city => New York City
*/
export const deSlugify = (string: string): string => {
  if (typeof string !== 'string') return string;

  return string
    .replace(/-+/gm, ' ')
    .split(' ')
    .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(' ')
    .trim();
};
