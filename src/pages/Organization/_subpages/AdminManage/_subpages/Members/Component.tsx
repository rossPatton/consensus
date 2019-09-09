import cx from 'classnames';
import _ from 'lodash';
import React, {memo} from 'react';

import {tComponentProps} from './_types';

export const MembersComponent = memo((props: tComponentProps) => {
  const {users, userTotal} = props;

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
      </label>
      <ul>
        {users.map((user: tUser, i) => (
          <li
            key={i}
            className="brdA1 br8 mB3">
            <div
              className={cx({
                'fx aiCtr fs6 p2 pL3 pR3 brdB1': true,
                bgBlueLite: user.role === 'admin',
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
                  onClick={ev => props.leaveOrg(ev, user.id)}>
                  Remove this user
                </button>
              </div>
            </div>
            <div className="p3 fx aiCtr">
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
                <h3 className="ffLab fs5">
                  Role:
                </h3>
                <select
                  value={user.role as string}
                  className="mB3 row ffLab"
                  // onBlur={ev => props.updateState('role', ev)}
                  // onChange={ev => props.updateState('role', ev)}
                >
                  <option className="ttCap" value={user.role as string}>
                    Current role: {user.role}
                  </option>
                  <option value="member">
                    Member: has access to org but can&apos;t create new events, decisions, etc
                  </option>
                  <option value="admin">
                    Admin: can create events, decisions, manage users, etc
                  </option>
                </select>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
});
