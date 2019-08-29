// safer lowercase string method than the defautl
// generally, i prefer getting back an empty string instead of a TypeError
export const lowerCase = (s: string): string => {
  if (typeof s !== 'string') return '';
  return s.toLowerCase();
};

export const upperCase = (s: string) => {
  if (typeof s !== 'string') return '';
  return s.toUpperCase();
};
