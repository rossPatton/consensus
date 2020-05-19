import React from 'react';
import render from 'react-test-renderer';

import Avatar from '.';

describe('components/Avatar', () => {
  it('renders without crashing', () => {
    render.create(<Avatar type="groups" />);
  });

  it('renders empty div when no props', () => {
    const component = render.create(<Avatar />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders user image tag when hash prop provided', () => {
    const component = render.create((
      <Avatar
        hash="notARealHash"
        type="users"
      />
    ));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders group image tag when hash prop provided', () => {
    const component = render.create((
      <Avatar
        hash="notARealHash"
        type="groups"
      />
    ));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
