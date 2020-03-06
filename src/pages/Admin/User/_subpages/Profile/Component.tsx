import React, {memo} from 'react';

import {CurrentProfile, EditProfile} from './_components';
import {tComponentProps} from './_types';

export const ProfileComponent = memo((props: tComponentProps) => (
  <>
    {props.isLocked && (
      <CurrentProfile {...props} />
    )}
    {!props.isLocked && (
      <EditProfile {...props} />
    )}
  </>
));
