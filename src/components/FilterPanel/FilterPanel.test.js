import React from 'react';
import render from 'react-test-renderer';

import FilterPanel from '.';

// @TODO add checks for all the variants
describe('FilterPanel component', () => {
  it('renders without crashing', () => {
    render.create((
      <FilterPanel />
    ));
  });
});
