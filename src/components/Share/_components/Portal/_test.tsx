import React from 'react';
import render from 'react-test-renderer';

import SharePortal from '.';

describe('SharePortal component', () => {
  it('renders without crashing', () => {
    render.create((
      <SharePortal
        onClick={() => {}}
      />
    ));
  });
});
