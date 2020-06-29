import React from 'react';
import render from 'react-test-renderer';

import FilterPanel from '.';

// @TODO add checks for all the variants
describe('components/FilterPanel', () => {
  it('renders', () => {
    const component = render.create((
      <FilterPanel
        onSearchChange={jest.fn()}
      />
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with custom props', () => {
    const component = render.create((
      <FilterPanel
        className="test"
        memberName="dude"
        modName="other dude"
        placeholder="filter options here"
        onSearchChange={jest.fn()}
      />
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
