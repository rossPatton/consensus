import React, {memo} from 'react';

import {categories, roles} from '../../constants';
import {tProps} from './_types';

// the component half of the search filter container
// decoupled for ease of placement
const FilterPanel = memo((props: tProps) => (
  <div className={props.className || 'flex items-center p-2 bg-white rounded mb-2 text-sm font-bold'}>
    <label className="w-full mr-2" htmlFor="searchFilter">
      <input
        spellCheck
        type="search"
        id={props.id || 'searchFilter'}
        className="bg-gray-1 w-full"
        onChange={props.onSearchChange}
        placeholder={props.placeholder || 'Filter all results'}
      />
    </label>
    {props.filterOptions && (
      <select
        onBlur={props.onFilterOptionChange}
        onChange={props.onFilterOptionChange}>
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
          Show all categories
        </option>
        {categories.map(({display}) => (
          <option key={display} value={display}>
            {display}
          </option>
        ))}
      </select>
    )}
    {props.onPublishedFilterChange && (
      <select
        defaultValue={props.publishedFilter}
        onBlur={props.onPublishedFilterChange}
        onChange={props.onPublishedFilterChange}>
        <option value="n/a">
          Show all meetings
        </option>
        {[
          {display: 'Upcoming', value: 'upcoming'},
          {display: 'Past', value: 'past'},
        ].map(({display, value}) => (
          <option key={display} value={value}>
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
          Show all members
        </option>
        {roles.map(role => (
          <option
            key={role}
            value={role}>
            {role === 'member' ? props.memberName : props.modName}
          </option>
        ))}
      </select>
    )}
  </div>
));

export default FilterPanel;
