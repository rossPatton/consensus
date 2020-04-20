import React from 'react';
import render from 'react-test-renderer';

import ExternalLink from '.';

it('renders without crashing', () => {
  render.create(<ExternalLink />);
});

it('renders as expected (simple)', () => {
  const component = render.create((
    <ExternalLink>
      test
    </ExternalLink>
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders as expected (className/noFollow)', () => {
  const component = render.create((
    <ExternalLink
      noFollow
      className="test">
      test
    </ExternalLink>
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
