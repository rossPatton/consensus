import {deSlugify, lowerCase, slugify, upperCase} from '.';

describe('utils/string', () => {
  it('lowerCase should lowercase a string', () => {
    const shouldBeTrue = lowerCase('TEST');
    expect(shouldBeTrue).toEqual('test');
  });

  it('lowerCase should return an empty string', () => {
    const shouldBeEmpty = lowerCase();
    expect(shouldBeEmpty).toEqual('');
  });

  it('upperCase should upperCase a string', () => {
    const shouldBeTrue = upperCase('test');
    expect(shouldBeTrue).toEqual('TEST');
  });

  it('upperCase should return an empty string', () => {
    const shouldBeEmpty = upperCase();
    expect(shouldBeEmpty).toEqual('');
  });

  it('slugify a simple group name', () => {
    const shouldBeTrue = slugify('Tech Workers Coalition');
    expect(shouldBeTrue).toEqual('tech-workers-coalition');
  });

  it('slugify a simple title with colon', () => {
    const shouldBeTrue = slugify('Join us for Labor Notes: Placeholder');
    expect(shouldBeTrue).toEqual('join-us-for-labor-notes-placeholder');
  });

  it('slugify a complicated title', () => {
    const shouldBeTrue = slugify("(HEY! CONFUSED?) That's because; hold it, wait: that's because I'm doing this on purpose.");
    expect(shouldBeTrue).toEqual('hey-confused-thats-because-hold-it-wait-thats-because-im-doing-this-on-purpose');
  });

  it('slugify should return empty string', () => {
    const shouldBeEmpty = slugify();
    expect(shouldBeEmpty).toEqual('');
  });

  it('deSlugify a simple group handle', () => {
    const shouldBeTrue = deSlugify('tech-workers-coalition');
    expect(shouldBeTrue).toEqual('Tech Workers Coalition');
  });

  it('deSlugify should return empty string', () => {
    const shouldBeEmpty = deSlugify();
    expect(shouldBeEmpty).toEqual('');
  });
});
