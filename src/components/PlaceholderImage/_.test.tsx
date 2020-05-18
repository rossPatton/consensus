import React from 'react';
import render from 'react-test-renderer';

import PlaceholderImage from '.';

describe('PlaceholderImage component', () => {
  it('renders without crashing', () => {
    render.create((
      <PlaceholderImage
        height="50"
        width="50"
      />
    ));
  });
});
