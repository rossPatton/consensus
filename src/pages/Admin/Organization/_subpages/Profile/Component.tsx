import React, {memo} from 'react';

import {CurrentProfile, EditProfile} from './_components';
import {tComponentProps} from './_types';

export const ProfileComponent = memo((props: tComponentProps) => (
  <div className="bgWhite br8 p3">
    {props.isLocked && (
      <CurrentProfile {...props} />
    )}
    {!props.isLocked && (
      <EditProfile {...props} />
    )}
  </div>
));
