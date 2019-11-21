import _ from 'lodash';
import React, {memo} from 'react';

import {Users} from '../../../../../components';
import {tComponentProps} from './_types';

export const MembersComponent = memo((props: tComponentProps) => {
  const {users, userTotal} = props;
  const roles: tRole[] = ['member', 'facilitator'];

  console.log('members component => ', props);

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
        <select
          onBlur={props.onRoleFilterChange}
          onChange={props.onRoleFilterChange}>
          <option key="n/a" value="n/a">
            Filter by User Role
          </option>
          {roles.map((role: tRole, i) => (
            <option key={i} value={role as string}>
              {role}
            </option>
          ))}
        </select>
      </label>
      <Users
        deleteUserByOrg={props.deleteUserByOrg}
        match={props.match}
        users={users}
        setUserRole={props.setUserRole}
      />
    </>
  );
});
