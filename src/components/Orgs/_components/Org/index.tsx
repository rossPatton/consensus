import {Avatar} from '@app/components';
import cx from 'classnames';
import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {tProps} from './_types';

const Org = memo((props: tProps) => {
  const roleMap = _.find(props.roles, r => r.orgId === props.org.id) || {};
  const {role} = roleMap as tRoleMap;

  return (
    <li
      key={props.index}
      className={cx({
        relative: true,
        'mb-2': props.asList,
        'w-full mb-2 d:mb-3': !props.asList,
        'd:w-1/4': !props.asList && props.orgs.length > 3,
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
            alt={`Avatar for ${props.org.name}`}
            hash={props.org.avatarHash}
            size="60"
            type="group"
          />
        </div>
        <div>
          {role && (
            <small className="leading-none">
              You are {role === 'pending' ? role : `a ${role}`}
            </small>
          )}
          <h3>
            <Link to={`/org/${props.org.handle}`}>
              {props.org.name}
            </Link>
          </h3>
          <div
            className={cx({
              'text-sm text-gray-5 font-bold': true,
              'flex items-center': props.asList,
            })}>
            {props.showType && (
              <span className="capitalize mr-2">
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
            <button
              className="absolute r mr-2 p-2"
              onClick={ev => props.leaveOrg(ev, props.org.id)}>
              {props.groupType === 'pending'
                ? 'Cancel Membership Request'
                : 'Leave Group'}
            </button>
          )}
      </div>
    </li>
  );
});

export default Org;
