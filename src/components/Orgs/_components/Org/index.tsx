import cx from 'classnames';
import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Avatar} from '../../..';
import {tProps} from './_types';

const Org = memo((props: tProps) => {
  const roleMap = _.find(props.roles, r => r.orgId === props.org.id) || {};
  const {role} = roleMap as tRoleMap;

  return (
    <li
      key={props.index}
      className={cx({
        'mb-3': props.asList,
        ' fxg0 fourth mB5 pr-3': !props.asList,
      })}>
      <div
        role="button"
        tabIndex={0}
        onMouseEnter={() => props.setHover(props.index, role)}
        onMouseLeave={() => props.setHover(null)}
        className={cx({
          'flex items-center text-sm leading-none no-underline': true,
          'p-3 hover:bg-gray-11 trans1 br4': props.asList,
        })}>
        <div className="mr-2">
          <Avatar
            alt={`Avatar for ${props.org.name}`}
            type="group"
            url={props.org.avatarHash}
          />
        </div>
        <div>
          {role && (
            <div className="fs7 text-bold mb-2">
              You are {role === 'pending' ? role : `a ${role}`}
            </div>
          )}
          <h2 className="leading-none fs3 mb-2">
            <Link to={`/org/${props.org.handle}`}>
              {props.org.name}
            </Link>
          </h2>
          <div
            className={cx({
              'fs7 text-bold': true,
              'flex items-center': props.asList,
            })}>
            {props.showType && (
              <span className="dInBl capitalize bgGrey4 br4 p-1 white mr-2">
                {props.org.type}
              </span>
            )}
            {props.showCategory && (
              <span
                className={cx({
                  'mr-2': props.asList,
                  'mb-1': !props.asList,
                })}>
                {props.org.category}
              </span>
            )}
            {props.showLocation && (
              <span
                className={cx({
                  'mr-2': true,
                  'mb-1': !props.asList,
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
            <div className="text-right">
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
