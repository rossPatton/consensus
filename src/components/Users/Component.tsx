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
        className="bgWhite mB3 hvrBgGrey1 br4">
        {(props.sessionRole === 'admin' || props.sessionRole === 'facilitator')
            && (
              <button
                className="fs6 bgWhite"
                onClick={ev => props.removeUser(ev, user.id)}>
                {user.role === 'pending'
                  ? 'Reject this user'
                  : 'Remove this user'}
              </button>
            )}
        <div className="p3 fx">
          <h3>
            <div className="ffLab fs5">Username:</div>
            <Link to={`/user/${user.id}`}>
              {user.username}
            </Link>
          </h3>
          <div className="row">
            <h3 className="ffLab fs5 ttCap">
              Current role:
              <div className="fs3 fw600">
                {user.role}
              </div>
            </h3>
            {(props.sessionRole === 'admin' || props.sessionRole === 'facilitator')
              && (
                <select
                  className="row ffLab ttCap"
                  value={user.role as string}
                  onChange={ev => props.setUserRole(ev, user.id)}>
                  <option key="default" value={user.role as string}>
                    Choose a new role
                  </option>
                  {roles.map(role => (
                    role === user.role
                      ? null
                      : (
                        <option
                          className="ttCap"
                          key={role as string}
                          value={role as string}>
                          {role}
                        </option>
                      )
                  ))}
                </select>
              )}
          </div>
        </div>
      </li>
    ))}
  </ul>
));
