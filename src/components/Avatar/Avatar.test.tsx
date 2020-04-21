import React from 'react';
import render from 'react-test-renderer';

import Avatar from '.';

it('renders without crashing', () => {
  render.create(<Avatar />);
});

it('renders empty div when no props', () => {
  const component = render.create(<Avatar />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders image tag when hash prop provided', () => {
  const component = render.create((
    <Avatar
      hash="notARealHash"
    />
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
