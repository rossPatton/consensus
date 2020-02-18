import cx from 'classnames';
import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {tProps} from './_types';

export const OrgsComponent = memo((props: tProps) => (
  <ul
    className={cx({
      'fx fxWrap': !props.asList,
    })}>
    {props.orgs.map((org, i) => {
      const roleMap = _.find(props.roles, r => r.orgId === org.id) || {};
      const {role} = roleMap as tRoleMap;

      return (
        <li
          key={i}
          className={cx({
            'p3 hvrBgGrey1 trans1 br8': props.asList,
            'col fxg0 fourth mB5 pR3': !props.asList,
          })}>
          <Link
            to={`/org/${org.id}`}
            className="fs6 lh1 noUnderline">
            <div className="fs7 fw600 mB2">
              <span className="ttCap bgGrey4 br4 p1 white mR2">
                {org.type}
              </span>
              {org.category}
            </div>
            <h2 className="dBl lh1 fs3 underline">
              {org.name}
            </h2>
            {props.showLocation && `Based in ${org.city}`}
            {role && (
              <div className="mT2 fs7 fw600 ttCap fx aiCtr col">
                {role}
              </div>
            )}
          </Link>
        </li>
      );
    })}
  </ul>
));
