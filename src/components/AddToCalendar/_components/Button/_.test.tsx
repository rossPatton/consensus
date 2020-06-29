import React from 'react';
import render from 'react-test-renderer';

import Button from '.';

describe('components/AddToCalendar/Button', () => {
  it('renders without crashing', () => {
    const component = render.create((
      <Button
        children="Add to Calendar"
        onClick={() => {}}
      />
    )).root;

    expect(component).toMatchSnapshot();
    expect(component.findByType('button').props.children[1])
      .toEqual('Add to Calendar');
  });
});
