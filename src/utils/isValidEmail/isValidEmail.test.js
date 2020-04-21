import React from 'react';
import render from 'react-test-renderer';

import {isValidEmail} from '.';

describe('utils/isValidEmail', () => {
  it('"test@test.com" should return true', () => {
    const shouldBeTrue = isValidEmail('test@test.com');
    expect(shouldBeTrue).toBe(true);
  });

  it('"test" return false', () => {
    const shouldBeFalse = isValidEmail('test');
    expect(shouldBeFalse).toBe(false);
  });

  it('"test.com" should return false', () => {
    const shouldBeFalse = isValidEmail('@test.com');
    expect(shouldBeFalse).toBe(false);
  });

  it('"test@example" should return false', () => {
    const shouldBeFalse = isValidEmail('test@example');
    expect(shouldBeFalse).toBe(false);
  });
});
