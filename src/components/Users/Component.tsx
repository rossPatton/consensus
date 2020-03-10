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
        <div className="bgGrey3 circ mR3 p3" />
        <div className="col row">
          <h3 className="mB1">
            <Link to={`/user/${user.id}`}>
              @{user.username}
            </Link>
          </h3>
          <div className="fx aiCtr">
            {user.role !== 'pending' && (
              <span className="p1 lh1 fs7 bgGrey4 white fw600 br4 mR2">
                {user.role === 'member' ? props.memberName : props.modName}
              </span>
            )}
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
