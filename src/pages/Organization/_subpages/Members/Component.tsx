import _ from 'lodash';
import React, {memo} from 'react';

import {Users} from '../../../../components';
import {roles} from '../../../../constants';
import {tComponentProps} from './_types';

export const MembersComponent = memo((props: tComponentProps) => (
  <>
    <label
      htmlFor="searchFilter"
      className="fx aiCtr p3 bgGrey1 br8 mB4">
      <input
        spellCheck
        type="search"
        id="searchFilter"
        className="mR2 lh1 row"
        onChange={props.onSearchChange}
        placeholder="Search for someone by username"
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
      users={props.users}
      sessionRole={props.role}
      setUserRole={props.setUserRole}
    />
  </>
));
