import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import {act, create} from 'react-test-renderer';

import ScrollToTop from '.';

describe('containers/ScrollToTop', () => {
  beforeAll(() => {
    global.scrollTo = jest.fn();
  });

  it('renders null', () => {
    const component = create((
      <MemoryRouter>
        <ScrollToTop location={{pathname: '/'}} />
      </MemoryRouter>
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('render children', () => {
    const component = create((
      <MemoryRouter>
        <ScrollToTop location={{pathname: '/'}}>
          test
        </ScrollToTop>
      </MemoryRouter>
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('updates on pathname change', () => {
    const component = create((
      <MemoryRouter>
        <ScrollToTop location={{pathname: '/'}} />
      </MemoryRouter>
    ));

    act(() => {
      component.update((
        <MemoryRouter>
          <ScrollToTop location={{pathname: '/user/1'}} />
        </MemoryRouter>
      ));
    });

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
