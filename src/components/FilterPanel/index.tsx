import React, {memo} from 'react';

import {roles} from '../../constants';
import {tProps} from './_types';

// the component half of the search filter container
// decoupled for ease of placement
const FilterPanel = memo((props: tProps) => (
  <div className={props.className || 'fx aiCtr p3 bgWhite br8 mB3 fs6 fw600'}>
    <label className="row mR2" htmlFor="searchFilter">
      <input
        spellCheck
        type="search"
        id="searchFilter"
        className="bgGrey1 row"
        onChange={props.onSearchChange}
        placeholder={props.placeholder || 'Filter the results below'}
      />
    </label>
    {props.onPrivacyFilterChange && (
      <select
        onBlur={props.onPrivacyFilterChange}
        onChange={props.onPrivacyFilterChange}>
        <option value="n/a">
          All Events
        </option>
        <option value="private">
          Private Events
        </option>
        <option value="public">
          Public Events
        </option>
      </select>
    )}
    {props.onRoleFilterChange && (
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
  </div>
));

export default FilterPanel;
