import loglevel from 'loglevel';

import { isNull, isUndefined } from '..';

type tObj = {[key: string]: any};
/*
  @description regardless of what we pass in, always returns a string
  if query object, returns query string
*/
export const objToQueryString = (obj: tObj): string => {
  if (isNull(obj) || isUndefined(obj)) return '';
  if (typeof obj === 'string') return obj;
  if (obj instanceof Array) return '';
  if (typeof obj !== 'object') return '';
  if (Object.keys(obj).length === 0) return '';

  const qs = Object.keys(obj)
    .map(k => {
      if (__DEBUG__) loglevel.info('key => ', k, 'value => ', obj[k]);

      if (obj[k] === '') return `${k}=`; // if empty string
      if (isUndefined(obj[k])) return ''; // if undefined
      if (isNull(obj[k])) return `${k}=null`; // if null

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
