import React from 'react';
import { MemoryRouter } from 'react-router';
import render from 'react-test-renderer';

import Breadcrumbs from '.';

describe('components/Breadcrumbs', () => {
  it('renders without crashing', () => {
    const component = render.create(<Breadcrumbs />);
    expect(component).toMatchSnapshot();
  });

  it('renders null when no props', () => {
    const component = render.create(<Breadcrumbs crumbs="test" />);
    expect(component).toMatchSnapshot();
  });

  it('renders breadcrumbs when crumb prop passed in', () => {
    const component = render.create((
      <Breadcrumbs
        crumbs={[{
          display: 'Test',
          to: '/test',
        }]}
      />
    ));
    expect(component).toMatchSnapshot();
  });

  it('renders multiple breadcrumbs', () => {
    const component = render.create((
      <MemoryRouter location="" context={{}}>
        <Breadcrumbs
          crumbs={[{
            display: 'Test',
            to: '/test',
          }, {
            display: 'Test 2',
            to: '/test2',
          }]}
        />
      </MemoryRouter>
    ));
    expect(component).toMatchSnapshot();
  });
});
