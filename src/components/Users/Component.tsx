import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {tComponentProps} from './_types';
const roles: tRole[] = ['member', 'facilitator'];

export const UsersComponent = memo((props: tComponentProps) => (
  <ul>
    {props.users.map((user: tUser, i) => (
      <li
        key={i}
        className="bg-white mb-3 hover:bg-gray-11 br4 flex items-center p-3">
        <div className="bgGrey3 circ mr-3 p-3" />
        <div className="w-full">
          <h3 className="mb-1">
            <Link to={`/user/${user.id}`}>
              @{user.username}
            </Link>
          </h3>
          <div className="flex flex-col d:flex-row items-center">
            {user.role !== 'pending' && (
              <span className="p-1 leading-none fs7 bgGrey4 white text-bold br4 mr-2">
                {user.role === 'member' ? props.memberName : props.modName}
              </span>
            )}
            {(props.sessionRole === 'admin' || props.sessionRole === 'facilitator')
                && (
                  <button
                    className="fs7 bg-white"
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
