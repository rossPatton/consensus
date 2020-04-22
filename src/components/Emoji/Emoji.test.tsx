import React from 'react';
import render from 'react-test-renderer';

import Emoji from '.';

it('renders as expected', () => {
  const component = render.create((
    <Emoji
      label="testing butt emoji"
      emoji="🍑"
    />
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
