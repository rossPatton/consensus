import _ from 'lodash';
import React, {memo} from 'react';

import {DesktopMeetings, MobileMeetings} from './_breakpoints';
import {tComponentProps} from './_types';

export const MeetingsComponent = memo((props: tComponentProps) => {
  if (props.isDesktop) {
    return (
      <DesktopMeetings
        {...props}
      />
    );
  }

  return (
    <MobileMeetings
      {...props}
    />
  );
});
