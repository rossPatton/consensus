import React from 'react';
import render from 'react-test-renderer';

import Breadcrumbs from '.';

it('renders without crashing', () => {
  render.create(<Breadcrumbs />);
});

it('renders null when no props', () => {
  const component = render.create(<Breadcrumbs />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders breadcrumbs when crumb prop passed in', () => {
  const component = render.create((
    <Breadcrumbs
      crumbs={[{display: 'Test', to: '/test'}]}
    />
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
