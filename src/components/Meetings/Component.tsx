import dayJS from 'dayjs';
import _ from 'lodash';
import React, {FunctionComponent, memo, useState} from 'react';

import {DesktopMeetings, MobileMeetings} from './_breakpoints';
import {tComponentProps} from './_types';

export const MeetingsComponent: FunctionComponent<tComponentProps> = memo(props => {
  const [renderPast, togglePast] = useState(false);

  const now = dayJS();
  const pastMeetings = props.meetings.filter(m => dayJS(m.date).isBefore(now));
  const upcomingMeetings = props.meetings.filter(m => !dayJS(m.date).isBefore(now));

  // default to showing past meeting if we have meetings, but none are upcoming
  let meetingsToRender = renderPast ? pastMeetings : upcomingMeetings;
  const renderPastAsFallback = pastMeetings.length > 0 && upcomingMeetings.length === 0;
  if (renderPastAsFallback) {
    meetingsToRender = pastMeetings;
  }

  if (props.isDesktop) {
    return (
      <DesktopMeetings
        deleteMeeting={props.deleteMeeting}
        horizontal={props.horizontal}
        isEditable={props.isEditable}
        meetingsToRender={meetingsToRender}
        pastMeetingsCount={pastMeetings.length}
        upcomingMeetingsCount={upcomingMeetings.length}
        renderPast={renderPastAsFallback || renderPast}
        renderPastAsFallback={renderPastAsFallback}
        // whether to allow toggling of past meeting at all
        showPast={props.showPast}
        showGroupName={props.showGroupName}
        togglePast={togglePast}
      />
    );
  }

  return (
    <MobileMeetings
      deleteMeeting={props.deleteMeeting}
      isEditable={props.isEditable}
      meetingsToRender={meetingsToRender}
      pastMeetingsCount={pastMeetings.length}
      upcomingMeetingsCount={upcomingMeetings.length}
      renderPast={renderPast}
      renderPastAsFallback={renderPastAsFallback}
      // whether to allow toggling of past meeting at all
      showPast={props.showPast}
      showGroupName={props.showGroupName}
      togglePast={togglePast}
    />
  );
});
