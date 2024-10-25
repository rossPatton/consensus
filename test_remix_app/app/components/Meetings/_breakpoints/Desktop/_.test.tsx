import React from 'react';
import {MemoryRouter} from 'react-router';
import render from 'react-test-renderer';

import {testMeeting1, testMeeting2} from '~app/constants/jest';

import DesktopMeetings from '.';

describe('component/Meetings/breakpoint/Desktop', () => {
  it('renders desktop meetings', () => {
    const component = render.create((
      <MemoryRouter>
        <DesktopMeetings
          deleteMeeting={jest.fn()}
          meetingsToRender={[testMeeting1, testMeeting2]}
        />
      </MemoryRouter>
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders past desktop meetings', () => {
    const component = render.create((
      <MemoryRouter>
        <DesktopMeetings
          deleteMeeting={jest.fn()}
          meetingsToRender={[testMeeting1, testMeeting2]}
          publishedFilter="past"
        />
      </MemoryRouter>
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders past as fallback desktop meetings', () => {
    const component = render.create((
      <MemoryRouter>
        <DesktopMeetings
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
