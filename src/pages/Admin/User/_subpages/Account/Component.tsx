import React, {memo} from 'react';

import {CurrentAccount, EditAccount} from './_components';
import {tComponentProps} from './_types';

export const AccountComponent = memo((props: tComponentProps) => (
  <>
    {props.isLocked && (
      <CurrentAccount {...props} />
    )}
    {!props.isLocked && (
      <EditAccount {...props} />
    )}
  </>
));
