import cx from 'classnames';
import _ from 'lodash';
import React, {memo} from 'react';

import {tComponentProps} from './_types';

export const MembersComponent = memo((props: tComponentProps) => {
  const {users, userTotal} = props;
  const roles: tRole[] = ['member', 'facilitator', 'admin'];

  return (
    <>
      <h2>Manage Organization Members</h2>
      <h3 className="mB3">{userTotal} members</h3>
      <label
        htmlFor="searchFilter"
        className="fx aiCtr p3 bgGrey1 br8 mB4">
        <input
          spellCheck
          type="search"
          id="searchFilter"
          className="mR2 lh1 row"
          onChange={props.onSearchChange}
          placeholder="Search for a member by username"
        />
        <select onBlur={props.onFilterChange} onChange={props.onFilterChange}>
          <option value="n/a">
            Filter by User Role
          </option>
          {roles.map((role: tRole, i) => (
            <option key={i} value={role as string}>
              {role}
            </option>
          ))}
        </select>
      </label>
      <ul>
        {users.map((user: tUser, i) => (
          <li
            key={i}
            className="brdA1 br8 mB3 trans2">
            <div
              className={cx({
                'fx fs6 p2 pL3 pR3 brdB1': true,
                bgBlueLite: user.role === 'admin',
                bgYellowLite: user.role === 'facilitator',
                bgGreenLite: user.role === 'member',
              })}>
              <div className="fx aiCtr col">
                <span className="ttCap mR3">
                  {user.role}
                </span>
              </div>
              <div className="col taR">
                <button
                  className="bgWhite"
                  onClick={ev => props.deleteUserByOrg(ev, user.id)}>
                  Remove this user
                </button>
              </div>
            </div>
            <div className="p3 fx">
              <h3>
                <div className="ffLab fs5">Username:</div>
                {user.username}
              </h3>
              <h3>
                <div className="ffLab fs5">First name:</div>
                {user.fname}
              </h3>
              <h3>
                <div className="ffLab fs5">Last name:</div>
                {user.lname}
              </h3>
              <div className="row">
                <h3 className="ffLab fs5 ttCap mB2">
                  Current role: {user.role}
                </h3>
                <select
                  className="row ffLab ttCap"
                  value={user.role as string}
                  onChange={ev => props.setRole(ev, user.id)}
                >
                  <option value={user.role as string}>
                    Choose a new role
                  </option>
                  {roles.map(role => (
                    role === user.role
                      ? null
                      : (
                        <option className="ttCap" value={role}>
                          {role}
                        </option>
                      )
                  ))}
                </select>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
});
