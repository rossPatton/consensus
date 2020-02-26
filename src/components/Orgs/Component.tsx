import cx from 'classnames';
import _ from 'lodash';
import React, {memo} from 'react';

import {Org} from './_components';
import {tComponentProps} from './_types';

export const OrgsComponent = memo((props: tComponentProps) => (
  <ul className={cx({'fx fxWrap': !props.asList})}>
    {props.orgs.length > 0
      && props.pendingOrgs.length > 0
      && (
        <li className="fw600 mB2 pB2 brdB1">
          Current group memberships
        </li>
      )}
    {props.orgs.map((org, i) => (
      <Org
        {...props}
        key={org.id}
        org={org}
        index={i}
        leaveOrg={props.leaveOrg}
        setHover={props.setHover}
      />
    ))}
    {props.pendingOrgs.length > 0 && (
      <>
        <li className="fw600 mB2 pB2 brdB1">
          Pending group memberships
        </li>
        {props.pendingOrgs.map((pendingOrg, i) => (
          <Org
            {...props}
            index={i}
            key={pendingOrg.id}
            leaveOrg={props.leaveOrg}
            org={pendingOrg}
            setHover={props.setHover}
          />
        ))}
      </>
    )}
  </ul>
));
