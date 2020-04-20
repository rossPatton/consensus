import React from 'react';
import render from 'react-test-renderer';

import Emoji from '.';

it('renders without crashing', () => {
  render.create(<Emoji />);
});

it('renders null when no props passed in', () => {
  const component = render.create(<Emoji />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

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
