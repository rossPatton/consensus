import cx from 'classnames';
import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Avatar, Emoji, FilterPanel} from '~app/components';
import {roles} from '~app/constants';

import {tComponentProps} from './_types';

export const UsersComponent = memo((props: tComponentProps) => {
  const {group: {memberName, modName}, isEditable, type} = props;
  const includeRoleFilter = type === 'members' && isEditable;

  return (
    <>
      <FilterPanel
        onRoleFilterChange={includeRoleFilter && props.onRoleFilterChange}
        onSearchChange={props.onSearchChange}
        memberName={memberName}
        modName={modName}
        placeholder="Search for someone by username"
      />
      <ul>
        {props.users.map((user, i) => {
          let showControls = isEditable && props.isDesktop;
          if (props.isMobile) {
            showControls = isEditable && props.showMobileControls === i;
          }

          return (
            <li
              key={i}
              className="bg-white hover:bg-gray-2 rounded flex items-center mb-1 p-1 relative">
              {(isEditable && props.isMobile) && (
                <button
                  className="absolute r p-1 mr-1"
                  onClick={() => props.toggleMobileControls(i)}>
                  {showControls ? 'Show' : 'Edit'}
                </button>
              )}
              {showControls && (
                <div className="flex d:absolute r d:mr-2 p-1 d:p-0">
                  <button
                    className="border-0 bg-0 mr-2"
                    onClick={ev => props.removeUser(ev, user.id)}>
                    <Emoji
                      label="Big Red X Emoji"
                      emoji="❌"
                    />
                    {user.role === 'pending' ? 'Reject' : 'Remove'}
                  </button>
                  <select
                    value={user.role as string}
                    onChange={ev => props.setUserRole(ev, user.id)}>
                    <option key="" value={user.role}>
                      {user.role === 'pending' ? 'Approve' : 'Change role'}
                    </option>
                    {roles.map(role => (
                      role === user.role
                        ? null
                        : (
                          <option
                            key={role}
                            value={role}>
                            {role === 'member' ? memberName : modName}
                          </option>
                        )
                    ))}
                  </select>
                </div>
              )}
              <div
                className={cx({
                  'flex items-center': true,
                  hidden: props.isMobile && showControls,
                })}>
                <Avatar
                  hash={user.avatar}
                  type="users"
                />
                <div>
                  <div className="text-sm flex items-center text-sm leading-none">
                    {user.role !== 'pending' && (
                      <b className="mr-2">
                        {user.role === 'member' ? memberName : modName}
                      </b>
                    )}
                  </div>
                  <h3>
                    <Link to={`/user/${user.id}`}>
                      @{user.username}
                    </Link>
                  </h3>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
});
