import React from 'react';
import render from 'react-test-renderer';

import GenericLoader from '.';

describe('containers/GenericLoader', () => {
  it('renders loader', () => {
    const component = render.create((
      <GenericLoader
        isLoading
        render={() => <div />}
      />
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders empty div', () => {
    const component = render.create((
      <GenericLoader
        isLoading={false}
        render={() => <div />}
      />
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('dont render load screen, just null', () => {
    const component = render.create((
      <GenericLoader
        isLoading
        showLoader={false}
        render={() => <div />}
      />
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
