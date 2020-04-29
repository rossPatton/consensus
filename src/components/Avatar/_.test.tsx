import React from 'react';
import render from 'react-test-renderer';

import Avatar from '.';

describe('components/Avatar', () => {
  it('renders without crashing', () => {
    render.create(<Avatar type="group" />);
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
        type="user"
      />
    ));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders group image tag when hash prop provided', () => {
    const component = render.create((
      <Avatar
        hash="notARealHash"
        type="group"
      />
    ));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
