import cx from 'classnames';
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
        className="bgWhite br8 mB3">
        <div
          className={cx({
            'fx fs6 p2 pL3 pR3 brdB1': true,
            bgYellowLite: user.role === 'member',
            bgGreenLite: user.role === 'facilitator',
          })}>
          <div className="col ttCap mR3">
            {user.role}
          </div>
          {(props.sessionRole === 'admin' || props.sessionRole === 'facilitator')
            && (
              <div className="col taR">
                <button
                  className="bgWhite"
                  onClick={ev => props.removeUser(ev, user.id)}>
                  {user.role === 'pending'
                    ? 'Reject this user'
                    : 'Remove this user'}
                </button>
              </div>
            )}
        </div>
        <div className="p3 fx">
          <h3>
            <div className="ffLab fs5">Username:</div>
            <Link to={`/user/${user.id}`}>
              {user.username}
            </Link>
          </h3>
          {(props.sessionRole === 'admin' || props.sessionRole === 'facilitator')
            && (
              <div className="row">
                <h3 className="ffLab fs5 ttCap mB2">
                  Current role: {user.role}
                </h3>
                <select
                  className="row ffLab ttCap"
                  value={user.role as string}
                  onChange={ev => props.setUserRole(ev, user.id)}
                >
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
              </div>
            )}
        </div>
      </li>
    ))}
  </ul>
));
