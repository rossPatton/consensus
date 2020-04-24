import _ from 'lodash';
import React, {memo} from 'react';

import {DesktopEvents, MobileEvents} from './_breakpoints';
import {tComponentProps} from './_types';

export const EventsComponent = memo((props: tComponentProps) => {
  if (props.isDesktop) {
    return (
      <DesktopEvents
        {...props}
      />
    );
  }

  return (
    <MobileEvents
      {...props}
    />
  );
});
