import React from 'react';
import render from 'react-test-renderer';

import AddToCalendarPortal from '.';

describe('AddToCalendarPortal component', () => {
  it('renders without crashing', () => {
    render.create((
      <AddToCalendarPortal
        children={['test']}
        isOpen
        onRequestClose={() => {}}
      />
    ));
  });
});
