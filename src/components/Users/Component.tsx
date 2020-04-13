import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';
import cx from 'classnames';

import {Avatar} from '../../components';
import {tComponentProps} from './_types';

const roles: tRole[] = ['member', 'facilitator'];

export const UsersComponent = memo((props: tComponentProps) => {
  console.log('users props => ', props);

  return (
    <ul>
      {props.users.map((user: tUser, i) => {
        let showControls = props.isEditable && props.isDesktop;
        if (props.isMobile) {
          showControls = props.isEditable && props.showMobileControls === i;
        }

        return (
          <li
            key={i}
            className="bg-white hover:bg-gray-2 rounded flex items-center mb-1 p-1 relative">
            {props.isMobile && (
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
                  {user.role === 'pending' ? '❌Reject' : '❌Remove'}
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
                          {role === 'member' ? props.memberName : props.modName}
                        </option>
                      )
                  ))}
                </select>
              </div>
            )}
            <div
              className={cx({
                "flex items-center": true,
                hidden: props.isMobile && showControls,
              })}>
              <Avatar
                hash={user.avatarHash}
                size="66"
                type="user"
              />
              <div>
                <div className="text-sm flex items-center text-sm leading-none">
                  {user.role !== 'pending' && (
                    <b className='mr-2'>
                      {user.role === 'member' ? props.memberName : props.modName}
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
  );
});
