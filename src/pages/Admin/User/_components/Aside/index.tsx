import _ from 'lodash';
import React, {memo, useContext} from 'react';

import {MediaContext} from '~app/context';

import {DesktopAside, MobileAside} from './_breakpoints';
import {tProps} from './_types';

const Aside = memo((props: tProps) => {
  const {isDesktop} = useContext(MediaContext);

  if (isDesktop) {
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
