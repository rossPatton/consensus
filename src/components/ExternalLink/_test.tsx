import React from 'react';
import render from 'react-test-renderer';

import ExternalLink from '.';

describe('components/ExternalLink', () => {
  it('renders without crashing', () => {
    const component = render.create((
      <ExternalLink to="https://www.test.com">
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
        className="test"
        to="https://www.test.com">
        test
      </ExternalLink>
    ));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
