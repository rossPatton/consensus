import cx from 'classnames';
import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {PlaceholderImage} from '../../components';
import {tComponentProps} from './_types';

export const OrgsComponent = memo((props: tComponentProps) => (
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
            'mB3 pB3 brdB1': props.asList,
            'col fxg0 fourth mB5 pR3': !props.asList,
          })}>
          {props.isEditable && (
            <button
              className="bgWhite mB2"
              onClick={ev => props.leaveOrg(ev, org.id)}>
              Leave {org.name}
            </button>
          )}
          <Link
            to={`/org/${org.id}`}
            className={cx({
              'fx aiCtr fs6 lh1 noUnderline': true,
              'p3 hvrBgGrey1 trans1 br8': props.asList,
            })}>
            <div className="circ mR3 ovfHide">
              <PlaceholderImage height={60} width={60} />
            </div>
            <div>
              <div className="fs7 fw600 mB2">
                <span className="ttCap bgGrey4 br4 p1 white mR2">
                  {org.type}
                </span>
              </div>
              <h2 className="dBl lh1 fs3 underline mB2">
                {org.name}
              </h2>
              <div className="fs7 fw600">
                <span
                  className={cx({
                    'mB1': !props.asList,
                    'mR2': props.asList,
                  })}>
                  {org.category}
                </span>
                {props.showLocation && (
                  <span
                    className={cx({
                      'mB1': !props.asList,
                      'mR2': props.asList,
                    })}>
                    Based in {org.city}
                  </span>
                )}
                {role && (
                  <span className="ttCap">
                    {role}
                  </span>
                )}
              </div>
            </div>
          </Link>
        </li>
      );
    })}
  </ul>
));
