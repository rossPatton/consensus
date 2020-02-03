import _ from 'lodash';
import React, {memo} from 'react';

import {Users} from '../../../../components';
import {roles} from '../../../../constants';
import {tComponentProps} from './_types';

export const MembersComponent = memo((props: tComponentProps) => (
  <>
    <h2>{props.section === 'pending' && 'Pending'} Members List</h2>
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
      {props.section === 'members' && (
        <select
          onBlur={props.onRoleFilterChange}
          onChange={props.onRoleFilterChange}>
          <option key="n/a" value="n/a">
            Filter by User Role
          </option>
          {roles.map(role => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      )}
    </label>
    <Users
      removeUser={props.removeUser}
      match={props.match}
      users={props.users}
      sessionRole={props.role}
      setUserRole={props.setUserRole}
    />
  </>
));
