import React, {memo} from 'react';

import {CurrentAccount, EditAccount} from './_components';
import {tComponentProps} from './_types';

export const AccountComponent = memo((props: tComponentProps) => (
  <>
    {!props.subsection && (
      <CurrentAccount {...props} />
    )}
    {props.subsection === 'edit' && (
      <EditAccount {...props} />
    )}
  </>
));
