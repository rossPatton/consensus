import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Avatar} from '../../components';
import {tComponentProps} from './_types';

const roles: tRole[] = ['member', 'facilitator'];

export const UsersComponent = memo((props: tComponentProps) => (
  <ul>
    {props.users.map((user: tUser, i) => (
      <li
        key={i}
        className="bg-white hover:bg-gray-1 rounded flex items-center mb-1 p-2">
        <Avatar
          hash={user.avatarHash}
          size="66"
          type="user"
        />
        <div className="w-full">
          <h3 className="mb-1">
            <Link to={`/user/${user.id}`}>
              @{user.username}
            </Link>
          </h3>
          <div className="flex flex-col d:flex-row items-center">
            {user.role !== 'pending' && (
              <b className="p-1 text-sm mr-1">
                {user.role === 'member' ? props.memberName : props.modName}
              </b>
            )}
            {(props.sessionRole === 'admin' || props.sessionRole === 'facilitator')
                && (
                  <button
                    className="p-1 text-sm"
                    onClick={ev => props.removeUser(ev, user.id)}>
                    {user.role === 'pending'
                      ? 'Reject this user'
                      : 'Remove this user'}
                  </button>
                )}
          </div>
        </div>
        {(props.sessionRole === 'admin' || props.sessionRole === 'facilitator')
          && (
            <select
              className="capitalize"
              value={user.role as string}
              onChange={ev => props.setUserRole(ev, user.id)}>
              <option key="" value={user.role}>
                {user.role === 'pending'
                  ? 'Approve'
                  : 'Change role'}
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
          )}
      </li>
    ))}
  </ul>
));
