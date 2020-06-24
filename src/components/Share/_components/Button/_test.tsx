import React from 'react';
import render from 'react-test-renderer';

import ShareButton from '.';

describe('ShareButton component', () => {
  it('renders without crashing', () => {
    render.create((
      <ShareButton
        onClick={() => {}}
      />
    ));
  });
});
