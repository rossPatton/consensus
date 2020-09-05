import _ from 'lodash';
import React, {FunctionComponent, memo} from 'react';

import {DesktopMeetings, MobileMeetings} from './_breakpoints';
import {tComponentProps} from './_types';

export const MeetingsComponent: FunctionComponent<tComponentProps> = memo(props => {
  if (props.isDesktop) {
    return (
      <DesktopMeetings
        deleteMeeting={props.deleteMeeting}
        horizontal={props.horizontal}
        isEditable={props.isEditable}
        meetingsToRender={props.meetingsToRender}
        pastMeetingsCount={props.pastMeetings.length}
        upcomingMeetingsCount={props.upcomingMeetings.length}
        renderPast={props.renderPast}
        renderPastAsFallback={props.renderPastAsFallback}
        // whether to allow toggling of past meeting at all
        showPastToggle={props.showPastToggle}
        showGroupName={props.showGroupName}
        togglePast={props.togglePast}
      />
    );
  }

  return (
    <MobileMeetings
      deleteMeeting={props.deleteMeeting}
      isEditable={props.isEditable}
      meetingsToRender={props.meetingsToRender}
      pastMeetingsCount={props.pastMeetings.length}
      upcomingMeetingsCount={props.upcomingMeetings.length}
      renderPast={props.renderPast}
      renderPastAsFallback={props.renderPastAsFallback}
      // whether to allow toggling of past meeting at all
      showPastToggle={props.showPastToggle}
      showGroupName={props.showGroupName}
      togglePast={props.togglePast}
    />
  );
});
