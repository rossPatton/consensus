import {objToQueryString} from '.';

describe('utils/objToQueryString', () => {
  it('should convert simple object to query string', () => {
    const shouldBeQueryString = objToQueryString({
      key: 'value',
    });
    expect(shouldBeQueryString).toEqual('key=value');
  });

  it('should convert object with array to query string', () => {
    const shouldBeQueryString = objToQueryString({
      key: ['value1', 'value2'],
    });
    expect(shouldBeQueryString).toEqual('key=value1,value2');
  });

  it('should convert empty object to empty string', () => {
    const shouldBeEmptyString = objToQueryString({});
    expect(shouldBeEmptyString).toEqual('');
  });

  it('should convert non-object to empty string', () => {
    const shouldBeEmptyString = objToQueryString(null);
    expect(shouldBeEmptyString).toEqual('');
  });

  it('should convert array to empty string', () => {
    const shouldBeEmptyString = objToQueryString([]);
    expect(shouldBeEmptyString).toEqual('');
  });

  it('returns string as entered', () => {
    const shouldBeString = objToQueryString('test');
    expect(shouldBeString).toEqual('test');
  });

  it('returns empty string if not object but also not any of the above', () => {
    const shouldBeEmptyString = objToQueryString(() => {});
    expect(shouldBeEmptyString).toEqual('');
  });

  it('should handle empty strings', () => {
    const shouldBeQueryString = objToQueryString({key: ''});
    console.log('empty => ', shouldBeQueryString);
    expect(shouldBeQueryString).toEqual('key=');
  });

  it('should handle undefined', () => {
    const shouldBeEmptyString = objToQueryString({key: undefined});
    console.log('undefined => ', shouldBeEmptyString);
    expect(shouldBeEmptyString).toEqual('');
  });

  it('should handle multiple undefineds', () => {
    const shouldBeEmptyString = objToQueryString({key: undefined, key2: undefined});
    console.log('undefined => ', shouldBeEmptyString);
    expect(shouldBeEmptyString).toEqual('');
  });

  it('should handle nulls', () => {
    const shouldBeQueryString = objToQueryString({key: null});
    console.log('null => ', shouldBeQueryString);
    expect(shouldBeQueryString).toEqual('key=null');
  });

  it('should handle nested objects', () => {
    const shouldBeQueryString = objToQueryString({obj: {key: 'test'}});
    console.log('null => ', shouldBeQueryString);
    expect(shouldBeQueryString).toEqual('obj=key=test');
  });
});
