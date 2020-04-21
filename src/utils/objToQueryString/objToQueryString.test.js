import React from 'react';
import render from 'react-test-renderer';

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
});
