import cx from 'classnames';
import _ from 'lodash';
import React, {memo} from 'react';

import {Org} from './_components';
import {tComponentProps} from './_types';

export const OrgsComponent = memo((props: tComponentProps) => (
  <ul className={cx({'flex fxWrap': !props.asList})}>
    {props.orgs.length > 0
      && props.pendingOrgs.length > 0
      && (
        <li className="font-bold mb-2 pb-2 brdB1">
          Current group memberships
        </li>
      )}
    {props.orgs.map((org, i) => (
      <Org
        {...props}
        key={org.id}
        org={org}
        index={i}
      />
    ))}
    {props.pendingOrgs.length > 0 && (
      <>
        <li className="font-bold mb-2 pb-2 brdB1">
          Pending group memberships
        </li>
        {props.pendingOrgs.map((pendingOrg, i) => (
          <Org
            {...props}
            index={i}
            key={pendingOrg.id}
            org={pendingOrg}
          />
        ))}
      </>
    )}
  </ul>
));
