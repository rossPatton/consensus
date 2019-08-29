import {fuzz} from './fuzz';
import {lowerCase} from './string';

type tMatch = {
  rendered: string,
  score: number;
};

type tOpts = {
  input?: any[],
  key?: string,
  search?: string,
};

// takes an array of objects, returns a sorted and filtered array
// defaults to fuzzy matching against a 'name' key
// but can filter by any key, as long as the value is a string
export const fuzzFilterList = (opts: tOpts) => {
  const {
    input = [],
    key = 'name',
    search = '',
  } = opts;

  const searchNorm = lowerCase(search);

  return input
    .map(obj => {
      const orgNorm = lowerCase(obj[key]);
      const match = fuzz(searchNorm, orgNorm);
      return {
        ...obj,
        match,
      };
    })
    .filter(obj => !!obj.match && obj.match.score > 0)
    .sort((a: any, b: any) => {
      if (a.match.score > b.match.score) return -1;
      if (a.match.score < b.match.score) return 1;
      return 0;
    });
};
