import cx from 'classnames';
import _ from 'lodash';
import React, {memo, useContext} from 'react';
import {Link} from 'react-router-dom';

import {Avatar, Emoji, FilterPanel} from '~app/components';
import {roles} from '~app/constants';
import {MediaContext} from '~app/context';

import {tComponentProps} from './_types';

export const UsersComponent = memo((props: tComponentProps) => {
  const {isDesktop, isMobile} = useContext(MediaContext);
  const {group: {memberName, modName}, isEditable, isSelectable, type} = props;
  const includeRoleFilter = type === 'members' && isEditable;

  return (
    <div className={props.className}>
      <FilterPanel
        onRoleFilterChange={includeRoleFilter && props.onRoleFilterChange}
        onSearchChange={props.onSearchChange}
        memberName={memberName}
        modName={modName}
        placeholder="Search for someone by username"
      />
      {props.users instanceof Array
        && props.users.length > 0
        && (
          <ul>
            {isSelectable && (
              <li>
                <button
                  className="p-1 pl-2 pr-2 mb-2 hover:bg-gray-1"
                  onClick={() => props.toggleAll(props.users)}>
                  {props.allSelected ? 'Unselect' : 'Select'} all
                </button>
              </li>
            )}
            {props.users.map((user, i) => {
              let showControls = isEditable && isDesktop;
              if (isMobile) {
                showControls = isEditable && props.showMobileControls === i;
              }

              return (
                <li
                  key={i}
                  className="bg-white hover:bg-gray-2 rounded flex items-center mb-1 p-1 relative">
                  {isSelectable && (
                    <div
                      tabIndex={0}
                      role="button"
                      className="cursor-ptr flex d:flex-row items-center text-sm p-2"
                      onClick={() => props.toggleCheck(user.id)}
                      onKeyPress={() => props.toggleCheck(user.id)}>
                      <input
                        readOnly
                        type="checkbox"
                        className="flex-1 w-auto"
                        autoComplete="off"
                        checked={!!props.checked[user.id]}
                      />
                    </div>
                  )}
                  <div
                    className={cx({
                      'flex items-center': true,
                      hidden: isMobile && showControls,
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
                  {(isEditable && isMobile)
                && (
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
                          className="mr-1"
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
                </li>
              );
            })}
          </ul>
        )}
    </div>
  );
});
