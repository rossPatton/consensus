import {fuzzFilterList, fuzzyScore} from '.';

describe('utils/fuzzySearch', () => {
  it('should return score for search against provided string', async () => {
    const score = await fuzzyScore('search', 'searchStringToMatchAgainst');
    expect(score).toEqual(120);
  });

  it('should filter array of strings by fuzzyScore value', async () => {
    const filteredList = await fuzzFilterList({
      input: [{title: 'test'}, {title: 'test2'}, {title: 'example'}],
      key: 'title',
      search: 'test',
    });
    expect(filteredList).toStrictEqual([
      {score: 26, title: 'test'},
      {score: 26, title: 'test2'},
    ]);
  });

  it('should filter array of strings w/ custom pre-filter', async () => {
    const filteredList = await fuzzFilterList({
      // dont return private keys, as an example
      prefilter: {key: 'isPrivate', value: true},
      input: [
        {title: 'test', isPrivate: true},
        {title: 'test2', isPrivate: false},
        {title: 'example', isPrivate: false},
      ],
      key: 'title',
      search: 'test',
    });
    expect(filteredList).toStrictEqual([
      {score: 26, title: 'test2', isPrivate: false},
    ]);
  });

  it('should filter array of complicated strings w/ custom pre-filter', async () => {
    const filteredList = await fuzzFilterList({
      // strip private keys
      prefilter: {key: 'isPrivate', value: 'true'},
      input: [
        {title: 'something', isPrivate: 'true'},
        {title: 'test', isPrivate: 'false'},
        {title: 'tech', isPrivate: 'false'},
        {title: 'tectonic plates', isPrivate: 'false'},
        {title: "tech worker's coalition", isPrivate: 'false'},
        {title: 'nyc worker center', isPrivate: 'false'},
        {title: 'technologists against AI', isPrivate: 'false'},
      ],
      key: 'title',
      search: 'tech',
    });
    expect(filteredList).toStrictEqual([
      {score: 26, title: "tech", isPrivate: 'false'},
      {score: 26, title: "tech worker's coalition", isPrivate: 'false'},
      {score: 26, title: 'technologists against AI', isPrivate: 'false'},
      {score: 11, title: 'tectonic plates', isPrivate: 'false'},
      {score: 4, title: 'test', isPrivate: 'false'},
      {score: 4, title: 'nyc worker center', isPrivate: 'false'},
    ]);
  });
});
