import React from 'react';
import render from 'react-test-renderer';

import {isUndefined, notUndefined} from '.';

describe('utils/undefined', () => {
  it('isUndefined should return true', () => {
    const shouldBeTrue = isUndefined(undefined);
    expect(shouldBeTrue).toBe(true);
  });

  it('isUndefined should return false', () => {
    const shouldBeFalse = isUndefined(null);
    expect(shouldBeFalse).toBe(false);
  });

  it('notUndefined should return true', () => {
    const shouldBeTrue = notUndefined(null);
    expect(shouldBeTrue).toBe(true);
  });

  it('notUndefined should return false', () => {
    const shouldBeFalse = notUndefined(undefined);
    expect(shouldBeFalse).toBe(false);
  });
});
