import {fuzz} from './fuzz';

type tObjWithScore = {
  [key: string]: any,
  score: number,
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


  return input
    .map(obj => {
      const score = fuzz(search, obj[key]);
      return {
        ...obj,
        score,
      };
    })
    .filter((obj: tObjWithScore) => obj.score > 0)
    .sort((a: tObjWithScore, b: tObjWithScore) => {
      if (a.score > b.score) return -1;
      if (a.score < b.score) return 1;
      return 0;
    });
};
