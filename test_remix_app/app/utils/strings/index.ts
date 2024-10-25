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
 * @description anything not a letter or number - convert to dashes.
 * Tech Worker's Coalition(NYC) => tech-workers-coalition-nyc
 */
export const slugify = (string: string): string => {
  if (typeof string !== 'string') return '';

  return string
    // remove everything but letters, numbers and spaces
    .replace(/[^a-zA-Z\d\s]/gm, '')
    // then convert spaces to dashes
    .replace(/\s+/gm, '-')
    .toLowerCase()
    .trim();
};

/**
 * @description takes slugified output, returns human friendly string
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
