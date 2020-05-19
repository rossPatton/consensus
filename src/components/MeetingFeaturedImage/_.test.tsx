import React from 'react';
import render from 'react-test-renderer';

import MeetingFeaturedImage from '.';

describe('MeetingFeaturedImage component', () => {
  it('renders without crashing', () => {
    render.create((
      <MeetingFeaturedImage
        img="33b4d3ac-4fd8-4aab-bd69-c6a41cff3ddb.jpg"
        height="50"
        width="50"
      />
    ));
  });
});
