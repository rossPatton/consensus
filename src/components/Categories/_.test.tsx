import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import render from 'react-test-renderer';

import Categories from '.';

describe('components/Categories', () => {
  it('renders as expected', () => {
    const component = render.create(<Router><Categories /></Router>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
