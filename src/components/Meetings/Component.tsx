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
        publishedFilter={props.publishedFilter}
        renderPastAsFallback={props.renderPastAsFallback}
        showGroupName={props.showGroupName}
      />
    );
  }

  return (
    <MobileMeetings
      deleteMeeting={props.deleteMeeting}
      isEditable={props.isEditable}
      meetingsToRender={props.meetingsToRender}
      publishedFilter={props.publishedFilter}
      renderPastAsFallback={props.renderPastAsFallback}
      showGroupName={props.showGroupName}
    />
  );
});
