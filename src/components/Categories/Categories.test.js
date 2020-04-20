import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import render from 'react-test-renderer';

import Categories from '.';

it('renders without crashing', () => {
  render.create(<Router><Categories /></Router>);
});

it('renders as expected', () => {
  const component = render.create(<Router><Categories /></Router>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
