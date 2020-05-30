import cx from 'classnames';
import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Avatar} from '~app/components';

import {tProps} from './_types';

const Group = memo((props: tProps) => {
  const roleMap = _.find(props.roles, r => r.groupId === props.group.id) || {};
  const {role} = roleMap as ts.roleMap;

  return (
    <li
      key={props.index}
      className={cx({
        relative: true,
        'mb-2': props.asList,
        'w-full mb-2 d:mb-3': !props.asList,
        'd:w-1/4': !props.asList && props.groups.length > 3,
      })}>
      <div
        role="button"
        tabIndex={0}
        className={cx({
          'flex items-center p-1': true,
          'hover:bg-gray-3': props.isEditable,
        })}
        onMouseEnter={() => props.setHover(props.index, role)}
        onMouseLeave={() => props.setHover(null)}>
        <div className="mr-1">
          <Avatar
            alt={`Avatar for ${props.group.name}`}
            hash={props.group.avatar}
            type="groups"
          />
        </div>
        <div>
          {role && (
            <small className="leading-none">
              You are <b>{role === 'pending' ? role : `a ${role}`}</b>
            </small>
          )}
          <h3>
            <Link to={`/group/${props.group.handle}`}>
              {props.group.name}
            </Link>
          </h3>
          <div
            className={cx({
              'text-sm text-gray-5 font-bold': true,
              'flex items-center': props.asList,
            })}>
            {props.showType && (
              <span className="capitalize mr-2">
                {props.group.type}
              </span>
            )}
            {props.showCategory && (
              <span
                className={cx({
                  'mr-2': props.asList,
                  'mb-1': !props.asList,
                })}>
                {props.group.category}
              </span>
            )}
            {props.showLocation && (
              <span
                className={cx({
                  'mr-2': true,
                  'mb-1': !props.asList,
                })}>
                Based in {props.group.city}
              </span>
            )}
          </div>
        </div>
        {props.isEditable
          && props.hoverIndex === props.index
          && props.groupType === role
          && (
            <button
              className="absolute r mr-2 p-2"
              onClick={ev => props.leaveOrg(ev, props.group.id)}>
              {props.groupType === 'pending'
                ? 'Cancel Membership Request'
                : 'Leave Group'}
            </button>
          )}
      </div>
    </li>
  );
});

export default Group;
