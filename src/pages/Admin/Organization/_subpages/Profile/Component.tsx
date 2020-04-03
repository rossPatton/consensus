import React, {memo} from 'react';

import {CurrentProfile, EditProfile} from './_components';
import {tComponentProps} from './_types';

export const ProfileComponent = memo((props: tComponentProps) => (
  <div className="bg-white br8 p-3">
    {!props.subsection && (
      <CurrentProfile {...props} />
    )}
    {props.subsection === 'edit' && (
      <EditProfile {...props} />
    )}
  </div>
));
