import React from 'react';
import render from 'react-test-renderer';

import FilterPanel from '.';

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

  it('renders with standard props', () => {
    const component = render.create((
      <FilterPanel
        className="test"
        filterOptions={[{key: 'test', display: 'Display'}]}
        memberName="dude"
        modName="other dude"
        placeholder="filter options here"
        onSearchChange={jest.fn()}
      />
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with categories', () => {
    const component = render.create((
      <FilterPanel
        className="test"
        filterOptions={[{key: 'test', display: 'Display'}]}
        onCategoryChange={jest.fn()}
        memberName="dude"
        modName="other dude"
        placeholder="filter options here"
        onSearchChange={jest.fn()}
      />
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with published filter', () => {
    const component = render.create((
      <FilterPanel
        className="test"
        filterOptions={[{key: 'test', display: 'Display'}]}
        onPublishedFilterChange={jest.fn()}
        memberName="dude"
        modName="other dude"
        placeholder="filter options here"
        onSearchChange={jest.fn()}
      />
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with roles filter', () => {
    const component = render.create((
      <FilterPanel
        className="test"
        filterOptions={[{key: 'test', display: 'Display'}]}
        onRoleFilterChange={jest.fn()}
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
