import React from 'react';
import render from 'react-test-renderer';

import Avatar from '.';

describe('components/Avatar', () => {
  it('renders without crashing', () => {
    const component = render.create(<Avatar />).root;
    const div = component.findByType('div');
    expect(typeof div).toEqual('object');
  });

  it('renders empty div when no props', () => {
    const component = render.create(<Avatar />).root;
    const {children} = component.findByType('div');
    expect(children).toHaveLength(1);
    expect(children[0]).toEqual('');
  });

  it('renders img when hash prop provided', () => {
    const component = render.create((
      <Avatar
        hash="notARealHash"
        type="groups"
      />
    )).root;
    const img = component.findByType('img');
    expect(typeof img).toEqual('object');
  });

  it('renders img with correct src attribute', () => {
    const component = render.create((
      <Avatar
        hash="notARealHash"
        type="users"
      />
    )).root;
    const {props} = component.findByType('img');
    expect(props.src).toEqual('https://consensus.nyc3.digitaloceanspaces.com/users/notARealHash');
  });

  it('renders fallback avatar', () => {
    const component = render.create((
      <Avatar
        hash="1"
        type="users"
      />
    )).root;
    const {props} = component.findByType('img');
    expect(props.src).toEqual('/images/av/1.svg');
  });

  it('renders small avatar', () => {
    const component = render.create((
      <Avatar
        hash="1"
        size="sm"
        type="users"
      />
    )).root;
    const {props} = component.findByType('img');
    expect(props.src).toEqual('/images/av/1.svg');
  });
});
