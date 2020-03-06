import { notNull } from './notNull';
import { notUndefined } from './notUndefined';

type tObj = {[key: string]: any};
export const objToQueryString = (obj: tObj): string => {
  if (typeof obj !== 'object') return '';
  if (obj instanceof Array) return '';
  if (Object.keys(obj).length === 0) return '';

  const qs = Object.keys(obj)
    .map(k => {
      if (!notNull(obj[k])) return `${k}=null`;
      if (!notUndefined(obj[k])) return '';

      // handle nested objects and arrays
      // arrays are converted to comma delimited strings
      let value = obj[k];
      if (value instanceof Array) {
        value = value.join(',');
      } else if (typeof value === 'object') {
        value = objToQueryString(value);
      }

      return `${k}=${value}`;
    })
    .filter(s => !!s)
    .join('&');

  return encodeURI(qs);
};
