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
        className="bgWhite mB3 hvrBgGrey1 br4 fx aiCtr p3">
        <div className="col row">
          <h3 className="mB1">
            <Link to={`/user/${user.id}`}>
              @{user.username}
            </Link>
          </h3>
          <div className="fx aiCtr">
            <span className="p1 lh1 fs7 bgGrey4 white fw600 ttCap br4 mR2">
              {user.role}
            </span>
            {(props.sessionRole === 'admin' || props.sessionRole === 'facilitator')
                && (
                  <button
                    className="fs7 bgWhite"
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
              className="ttCap"
              value={user.role as string}
              onChange={ev => props.setUserRole(ev, user.id)}>
              <option key="default" value={user.role as string}>
                Assign new role
              </option>
              {roles.map(role => (
                role === user.role
                  ? null
                  : (
                    <option
                      key={role as string}
                      value={role as string}>
                      {role}
                    </option>
                  )
              ))}
            </select>
          )}
      </li>
    ))}
  </ul>
));
