import {Users} from '@app/components';
import _ from 'lodash';
import React, {memo} from 'react';

import {tComponentProps} from './_types';

export const MembersComponent = memo((props: tComponentProps) => (
  <div className="bg-white rounded p-2">
    <Users
      group={props.group}
      sessionRole={props.role}
      type={props.section}
    />
  </div>
));
