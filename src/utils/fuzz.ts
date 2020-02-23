import {lowerCase} from './string';


// return numeric score based on fuzzy match strength
// If `pattern` matches `string`, wrap each matching character
export const fuzz = function(search: string = '', string: string = '') {
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
