type tObj = {[key: string]: number | string | boolean};
export const objToQueryString = (obj: tObj): string => {
  if (typeof obj !== 'object') return '';
  if (obj instanceof Array) return '';

  return Object.keys(obj).map(k => {
    if (typeof obj[k] === 'undefined') return '';
    return `${k}=${obj[k]}`;
  })
    .filter(s => !!s)
    .join('&');
};
