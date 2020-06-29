import {lowerCase} from '..';
import {tObjWithScore, tOpts} from './_types';

// return numeric score based on fuzzy match strength
// If `pattern` matches `string`, wrap each matching character
export const fuzzyScore = async (search: string = '', string: string = '') => {
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
  let patternIdx = 0;
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

  return totalScore;
};

// takes an array of objects, returns a sorted and filtered array
// defaults to fuzzy matching against a 'name' key
// but can filter by any key, as long as the value is a string
export const fuzzFilterList = async (opts: tOpts) => {
  let {input = []} = opts;
  const {
    prefilter = null,
    key = 'name',
    search = '',
  } = opts;

  // remove a set from the list before fuzzy matching
  if (prefilter) {
    input = input.filter(item => item[prefilter.key] !== prefilter.value);
  }

  const scores = await Promise.all(input.map(async obj => {
    const tokens = [obj[key], ...obj[key].split(' ')] as string[];
    let score = 0;
    await Promise.all(tokens.map(async token => {
      const tokenScore = await fuzzyScore(search, token);
      if (tokenScore > score) score = tokenScore;
    }));

    return { ...obj, score };
  }));

  const scoresAboveZero = await Promise.all(
    scores.filter((obj: tObjWithScore) => obj.score > 0)
  );

  const rankedScores = await Promise.all(scoresAboveZero.sort((
    a: tObjWithScore,
    b: tObjWithScore) => {
    if (a.score > b.score) return -1;
    if (a.score < b.score) return 1;
    return 0;
  }))

  return rankedScores;
};
