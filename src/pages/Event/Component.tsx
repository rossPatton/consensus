import _ from 'lodash';
import React, {memo} from 'react';

import {DesktopEventPage, MobileEventPage} from './_breakpoints';
import {tComponentProps} from './_types';

export const EventComponent = memo((props: tComponentProps) => {
  if (props.isDesktop) {
    return (
      <DesktopEventPage
        {...props}
      />
    );
  }

  return (
    <MobileEventPage
      {...props}
    />
  );
});
