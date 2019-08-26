import { notNull } from './notNull';
import { notUndefined } from './notUndefined';

type tObj = {[key: string]: any};
export const objToQueryString = (obj: tObj): string => {
  if (typeof obj !== 'object') return '';
  if (obj instanceof Array) return '';

  return Object.keys(obj).map(k => {
    if (!notNull(obj[k])) return '';
    if (!notUndefined(obj[k])) return '';
    return `${k}=${obj[k]}`;
  })
    .filter(s => !!s)
    .join('&');
};
