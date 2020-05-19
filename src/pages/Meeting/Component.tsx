import _ from 'lodash';
import React, {memo, useContext} from 'react';

import {MediaContext} from '~app/context';

import {DesktopMeetingPage, MobileMeetingPage} from './_breakpoints';
import {tComponentProps} from './_types';

export const MeetingComponent = memo((props: tComponentProps) => {
  const {isDesktop} = useContext(MediaContext);

  if (isDesktop) {
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
