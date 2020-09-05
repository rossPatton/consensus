import React from 'react';
import {MemoryRouter} from 'react-router';
import render from 'react-test-renderer';

import {testMeeting1, testMeeting2} from '~app/constants/jest';

import MobileMeetings from '.';

describe('component/Meetings/breakpoint/Mobile', () => {
  it('renders mobile meetings', () => {
    const component = render.create((
      <MemoryRouter>
        <MobileMeetings
          deleteMeeting={jest.fn()}
          meetingsToRender={[testMeeting1, testMeeting2]}
          pastMeetingsCount={1}
          renderPast
          renderPastAsFallback
          showPastToggle
          togglePast={jest.fn()}
          upcomingMeetingsCount={1}
        />
      </MemoryRouter>
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
