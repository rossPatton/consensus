import React, {memo} from 'react';

import {CurrentProfile, EditProfile} from './_components';
import {tComponentProps} from './_types';

export const ProfileComponent = memo((props: tComponentProps) => (
  <div className="rounded d:border d:shadow d:p-2">
    {!props.subsection && (
      <CurrentProfile {...props} />
    )}
    {props.subsection === 'edit' && (
      <EditProfile {...props} />
    )}
  </div>
));
