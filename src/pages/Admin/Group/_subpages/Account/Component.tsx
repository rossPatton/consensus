import React, {memo} from 'react';

import {CurrentAccount, EditAccount} from './_components';
import {tComponentProps} from './_types';

export const AccountComponent = memo((props: tComponentProps) => (
  <div className="bg-white rounded p-2">
    {!props.subsection && (
      <CurrentAccount {...props} />
    )}
    {props.subsection === 'edit' && (
      <EditAccount {...props} />
    )}
  </div>
));
