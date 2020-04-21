import React from 'react';
import render from 'react-test-renderer';

import {parseTimeString} from '.';

describe('utils/parseTimeString', () => {
  it('should convert time string to minutes/hour tuple', () => {
    const shouldBeATuple = parseTimeString('7:15');
    expect(shouldBeATuple).toStrictEqual([7, 15]);
  });
});
