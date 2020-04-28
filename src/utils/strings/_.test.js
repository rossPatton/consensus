import {deSlugify, lowerCase, slugify, upperCase} from '.';

describe('utils/string', () => {
  it('lowerCase should lowercase a string', () => {
    const shouldBeTrue = lowerCase('TEST');
    expect(shouldBeTrue).toEqual('test');
  });

  it('upperCase should upperCase a string', () => {
    const shouldBeTrue = upperCase('test');
    expect(shouldBeTrue).toEqual('TEST');
  });

  it('slugify a simple group name', () => {
    const shouldBeTrue = slugify('Tech Workers Coalition');
    expect(shouldBeTrue).toEqual('tech-workers-coalition');
  });

  it('deSlugify a simple group handle', () => {
    const shouldBeTrue = deSlugify('tech-workers-coalition');
    expect(shouldBeTrue).toEqual('Tech Workers Coalition');
  });
});
