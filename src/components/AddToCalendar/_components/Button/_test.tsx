import React from 'react';
import render from 'react-test-renderer';

import AddToCalendarButton from '.';

// @TODO add checks for all the variants
describe('AddToCalendarButton component', () => {
  it('renders without crashing', () => {
    render.create((
      <AddToCalendarButton
        children="Test"
        onClick={() => {}}
      />
    ));
  });
});
