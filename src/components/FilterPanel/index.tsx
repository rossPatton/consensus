import React, {memo} from 'react';

import {categories, roles} from '../../constants';
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
    {props.filterOptions && (
      <select
        onBlur={props.onFilterOptionChange}
        onChange={props.onFilterOptionChange}>
        <option key="n/a" value="n/a">
          Change search filter type
        </option>
        {props.filterOptions.map(opt => (
          <option key={opt.key} value={opt.key}>
            {opt.display}
          </option>
        ))}
      </select>
    )}
    {props.onCategoryChange && (
      <select onBlur={props.onCategoryChange} onChange={props.onCategoryChange}>
        <option value="">
          Filter by Category
        </option>
        {categories.map(({display}) => (
          <option key={display} value={display}>
            {display}
          </option>
        ))}
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
