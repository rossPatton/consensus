import {fuzz} from './fuzz';

type tObjWithScore = {
  [key: string]: any,
  score: number,
};

type tOpts = {
  // if dealing with a long list, we might want to pre-filter the results by some criteria
  filterBy?: {key: string, value: string},
  input?: any[],
  key?: string,
  search?: string,
};

// takes an array of objects, returns a sorted and filtered array
// defaults to fuzzy matching against a 'name' key
// but can filter by any key, as long as the value is a string
export const fuzzFilterList = (opts: tOpts) => {
  const {
    filterBy = null,
    input = [],
    key = 'name',
    search = '',
  } = opts;

  if (filterBy) {
    input.filter(item => item[filterBy.key] === filterBy.value);
  }

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
