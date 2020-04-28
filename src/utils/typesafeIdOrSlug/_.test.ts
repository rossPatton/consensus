import {typesafeIdOrSlug} from '.';

describe('utils/typesafeIdOrSlug', () => {
  it('if value not a string at all, return an empty string', () => {
    const shouldBeAEmptyString = typesafeIdOrSlug(null);
    expect(shouldBeAEmptyString).toEqual('');
  });

  it('if value is a url slug, return the same string', () => {
    const shouldBeAString = typesafeIdOrSlug('test-url');
    expect(shouldBeAString).toEqual('test-url');
  });

  it('if value is an id param, return the value as a number', () => {
    const shouldBeANumber = typesafeIdOrSlug('1');
    expect(shouldBeANumber).toEqual(1);
  });
});
