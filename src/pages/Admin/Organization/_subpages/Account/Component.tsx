import React, {memo} from 'react';

import {CurrentAccount, EditAccount} from './_components';
import {tComponentProps} from './_types';

export const AccountComponent = memo((props: tComponentProps) => (
  <div className="bgWhite br8 p3">
    {!props.subsection && (
      <CurrentAccount {...props} />
    )}
    {props.subsection === 'edit' && (
      <EditAccount {...props} />
    )}
  </div>
));
