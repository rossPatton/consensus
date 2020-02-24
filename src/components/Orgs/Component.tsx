import cx from 'classnames';
import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {PlaceholderImage} from '../../components';
import {tComponentProps} from './_types';

export const OrgsComponent = memo((props: tComponentProps) => (
  <ul className={cx({'fx fxWrap': !props.asList})}>
    {props.orgs.map((org, i) => {
      const roleMap = _.find(props.roles, r => r.orgId === org.id) || {};
      const {role} = roleMap as tRoleMap;

      return (
        <li
          key={i}
          className={cx({
            'mB3': props.asList && i !== props.orgs.length - 1,
            'col fxg0 fourth mB5 pR3': !props.asList,
          })}>
          <div
            role="button"
            tabIndex={0}
            onMouseEnter={() => props.setHover(true)}
            onMouseLeave={() => props.setHover(false)}
            className={cx({
              'fx aiCtr fs6 lh1 noUnderline': true,
              'p3 hvrBgGrey1 trans1 br4': props.asList,
            })}>
            <div className="circ mR2 ovfHide">
              <PlaceholderImage
                height={60}
                seed={i}
                width={60}
              />
            </div>
            <div>
              <div className="fs7 fw600 mB2">
                <span className="ttCap bgGrey4 br4 p1 white mR2">
                  {org.type}
                </span>
              </div>
              <h2 className="dBl lh1 fs3 underline mB2">
                <Link to={`/org/${org.id}`}>
                  {org.name}
                </Link>
              </h2>
              <div
                className={cx({
                  'fs7 fw600': true,
                  'fx aiCtr': props.asList,
                })}>
                <span
                  className={cx({
                    'mR2': props.asList,
                    'mB1': !props.asList,
                  })}>
                  {org.category}
                </span>
                {props.showLocation && (
                  <div
                    className={cx({
                      'mR2': true,
                      'mB1': !props.asList,
                    })}>
                    Based in {org.city}
                  </div>
                )}
                {role && (
                  <div className="ttCap">
                    {role}
                  </div>
                )}
              </div>
            </div>
            {props.isEditable && props.isHovering && (
              <div className="col taR">
                <button onClick={ev => props.leaveOrg(ev, org.id)}>
                  Leave Group
                </button>
              </div>
            )}
          </div>
        </li>
      );
    })}
  </ul>
));
