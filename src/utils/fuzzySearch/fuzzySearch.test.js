import React from 'react';
import render from 'react-test-renderer';

import {fuzzFilterList, fuzzyScore} from '.';

describe('utils/fuzzySearch', () => {
  it('should return score for search against provided string', () => {
    const score = fuzzyScore('search', 'searchStringToMatchAgainst');
    expect(score).toEqual(120);
  });

  it('should filter array of strings by fuzzyScore value', () => {
    const filteredList = fuzzFilterList({
      input: [{title: 'test'}, {title: 'test2'}, {title: 'example'}],
      key: 'title',
      search: 'test',
    });
    expect(filteredList).toStrictEqual([
      {score: 26, title: 'test'},
      {score: 26, title: 'test2'},
    ]);
  });
});
