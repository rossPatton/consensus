import _ from 'lodash';
import React, {memo} from 'react';

import {DesktopAside, MobileAside} from './_breakpoints';
import {tProps} from './_types';

const Aside = memo((props: tProps) => {
  if (props.isDesktop) {
    return (
      <DesktopAside
        {...props}
      />
    );
  }

  return (
    <MobileAside />
  );
});

export default Aside;
