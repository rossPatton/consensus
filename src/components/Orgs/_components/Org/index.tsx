import cx from 'classnames';
import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {PlaceholderImage} from '../../../../components';
import {tProps} from './_types';

const Org = memo((props: tProps) => {
  const roleMap = _.find(props.roles, r => r.orgId === props.org.id) || {};
  const {role} = roleMap as tRoleMap;

  return (
    <li
      key={props.index}
      className={cx({
        'mB3': props.asList,
        'col fxg0 fourth mB5 pR3': !props.asList,
      })}>
      <div
        role="button"
        tabIndex={0}
        onMouseEnter={() => props.setHover(props.index, role)}
        onMouseLeave={() => props.setHover(null)}
        className={cx({
          'fx aiCtr fs6 lh1 noUnderline': true,
          'p3 hvrBgGrey1 trans1 br4': props.asList,
        })}>
        <div className="circ mR2 ovfHide">
          <PlaceholderImage
            height={60}
            seed={props.index}
            width={60}
          />
        </div>
        <div>
          {role && (
            <div className="fs7 fw600 mB2">
              You are a {role}
            </div>
          )}
          <h2 className="lh1 fs3 mB2">
            <Link to={`/org/${props.org.id}`}>
              {props.org.name}
            </Link>
          </h2>
          <div
            className={cx({
              'fs7 fw600': true,
              'fx aiCtr': props.asList,
            })}>
            {props.showType && (
              <span className="dInBl ttCap bgGrey4 br4 p1 white mR2">
                {props.org.type}
              </span>
            )}
            {props.showCategory && (
              <span
                className={cx({
                  'mR2': props.asList,
                  'mB1': !props.asList,
                })}>
                {props.org.category}
              </span>
            )}
            {props.showLocation && (
              <span
                className={cx({
                  'mR2': true,
                  'mB1': !props.asList,
                })}>
                Based in {props.org.city}
              </span>
            )}
          </div>
        </div>
        {props.isEditable
          && props.hoverIndex === props.index
          && props.groupType === role
          && (
            <div className="col taR">
              <button onClick={ev => props.leaveOrg(ev, props.org.id)}>
                {props.groupType === 'pending'
                  ? 'Cancel Membership Request'
                  : 'Leave Group'}
              </button>
            </div>
          )}
      </div>
    </li>
  );
});

export default Org;
