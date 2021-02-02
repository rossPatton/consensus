import React from 'react';
import ReactDOM from 'react-dom';
import render from 'react-test-renderer';

import AddToCalendarPortal from '.';

describe('components/AddToCalendar/Portal', () => {
  beforeAll(() => {
    ReactDOM.createPortal = jest.fn((element) => {
      return element;
    });
  });

  afterEach(() => {
    ReactDOM.createPortal.mockClear();
  });

  it('renders without crashing', () => {
    const component = render.create((
      <AddToCalendarPortal
        children={['test']}
        isOpen
        onRequestClose={() => {}}
      />
    ));

    expect(component.toJSON()).toMatchSnapshot();
  });
});
