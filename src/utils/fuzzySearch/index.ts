import {lowerCase} from '..';
import {tObjWithScore, tOpts} from './_types';

// return numeric score based on fuzzy match strength
// If `pattern` matches `string`, wrap each matching character
export const fuzzyScore = function(search: string = '', string: string = '') {
  let patternIdx = 0;
  const result = [];
  const len = string.length;
  let totalScore = 0;
  let currScore = 0;

  // string to compare against, whitespace removed
  // this might be a lowercase version of the raw string
  const compareString = lowerCase(string);
  // string to search with
  const pattern = lowerCase(search);
  let ch;

  // For each character in the string, either add it to the result
  // or wrap in template if it's the next string in the pattern
  let idx = 0;
  for (idx; idx < len; idx++) {
    ch = string[idx];
    if (compareString[idx] === pattern[patternIdx]) {
      patternIdx += 1;

      // consecutive characters should increase the score more than linearly
      currScore += 1 + currScore;
    } else {
      currScore = 0;
    }

    totalScore += currScore;
    result[result.length] = ch;
  }

  // return rendered string if we have a match for every char
  if (patternIdx === pattern.length) return totalScore;
  return 0;
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
      const score = fuzzyScore(search, obj[key]);
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
