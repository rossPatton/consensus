import _ from 'lodash';
import React, {memo} from 'react';

import {DesktopMeetingPage, MobileMeetingPage} from './_breakpoints';
import {tComponentProps} from './_types';

export const MeetingComponent = memo((props: tComponentProps) => {
  if (props.isDesktop) {
    return (
      <DesktopMeetingPage
        {...props}
      />
    );
  }

  return (
    <MobileMeetingPage
      {...props}
    />
  );
});
