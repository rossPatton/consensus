import cx from 'classnames';
import React, {memo} from 'react';

import {categories, roles} from '../../constants';
import {tProps} from './_types';

// the component half of the search filter container
// decoupled for ease of placement
const FilterPanel = memo((props: tProps) => (
  <div
    className={cx({
      [props.className]: !!props.className,
      'flex flex-col d:flex-row': true,
      'mb-3': !props.className,
    })}>
    {props.filterOptions && (
      <select
        className="w-full d:w-auto mb-1 d:mb-0 d:mr-2"
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
      <select
        className="w-full d:w-auto mb-1 d:mb-0 d:mr-2"
        onBlur={props.onCategoryChange}
        onChange={props.onCategoryChange}>
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
        className="w-full d:w-auto mb-1 d:mb-0 d:mr-2"
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
        className="w-full d:w-auto mb-1 d:mb-0 d:mr-2"
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
    <label
      className="w-full"
      htmlFor="searchFilter">
      <input
        spellCheck
        type="search"
        id={props.id || 'searchFilter'}
        className="bg-white w-full"
        onChange={props.onSearchChange}
        placeholder={props.placeholder || 'Filter all results'}
      />
    </label>
  </div>
));

export default FilterPanel;
