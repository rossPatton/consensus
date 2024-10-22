import _ from 'lodash';
import React, {memo} from 'react';

import {Users} from '~app/components';

import {tComponentProps} from './_types';

export const MembersComponent = memo((props: tComponentProps) => (
  <div className="d:pb-2 d:pl-2 d:pr-2">
    <Users
      group={props.group}
      sessionRole={props.role}
      type={props.section}
    />
  </div>
));
