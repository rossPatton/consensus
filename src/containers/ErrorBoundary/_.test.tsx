import React from 'react';
import render from 'react-test-renderer';

import ErrorBoundary from '.';

describe('containers/ErrorBoundary', () => {
  it('renders 200', () => {
    const component = render.create((
      <ErrorBoundary
        children=""
        status={200}
      />
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders 401', () => {
    const component = render.create((
      <ErrorBoundary
        children=""
        status={401}
      />
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders 204', () => {
    const component = render.create((
      <ErrorBoundary
        children=""
        status={204}
      />
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders 500', () => {
    const component = render.create((
      <ErrorBoundary
        children={<></>}
        status={500}
      />
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders 400', () => {
    const component = render.create((
      <ErrorBoundary
        children=""
        status={400}
      />
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders subpage', () => {
    const component = render.create((
      <ErrorBoundary
        children=""
        isSubPage
        status={500}
      />
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
