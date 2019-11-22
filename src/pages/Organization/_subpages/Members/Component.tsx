import _ from 'lodash';
import React, {memo} from 'react';

import {Users} from '../../../../components';
import {tComponentProps} from './_types';

const roles: tRole[] = ['member', 'facilitator'];

export const MembersComponent = memo((props: tComponentProps) => (
  <>
    <h2>Members List</h2>
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
      users={props.users}
      sessionRole={props.role}
      setUserRole={props.setUserRole}
    />
  </>
));
