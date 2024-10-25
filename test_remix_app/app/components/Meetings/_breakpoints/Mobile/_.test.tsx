import React from 'react';
import {MemoryRouter} from 'react-router';
import render from 'react-test-renderer';

import {testMeeting1, testMeeting2} from '~app/constants/jest';

import MobileMeetings from '.';

describe('component/Meetings/breakpoint/Mobile', () => {
  it('renders mobile meetings without error', () => {
    const component = render.create((
      <MemoryRouter>
        <MobileMeetings
          deleteMeeting={jest.fn()}
          meetingsToRender={[testMeeting1, testMeeting2]}
        />
      </MemoryRouter>
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders past mobile meetings', () => {
    const component = render.create((
      <MemoryRouter>
        <MobileMeetings
          deleteMeeting={jest.fn()}
          meetingsToRender={[testMeeting1, testMeeting2]}
          publishedFilter="past"
        />
      </MemoryRouter>
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders past as fallback mobile meetings', () => {
    const component = render.create((
      <MemoryRouter>
        <MobileMeetings
          deleteMeeting={jest.fn()}
          meetingsToRender={[testMeeting1, testMeeting2]}
          renderPastAsFallback
        />
      </MemoryRouter>
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
