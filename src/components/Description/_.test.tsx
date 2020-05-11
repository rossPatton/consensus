import React from 'react';
import render from 'react-test-renderer';

import Description from '.';

it('renders without crashing', () => {
  render.create(<Description />);
});

it('renders null when no description prop passed in', () => {
  const component = render.create(<Description />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders null when bad description passed in', () => {
  const component = render.create(<Description description="" />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders as expected', () => {
  const component = render.create((
    <Description
      description="testing rendering description. test. testing."
    />
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
