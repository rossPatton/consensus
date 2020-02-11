import React, { memo } from 'react';

import { Orgs } from '../../../../components';
import { categories } from '../../../../constants';
import { tComponentProps } from './_types';

export const CityComponent = memo((props: tComponentProps) => (
  <>
    <h1 className="mB2">
      {props.city.name}
    </h1>
    <label
      htmlFor="searchFilter"
      className="fx aiCtr p3 bgWhite br8 mB4">
      <input
        spellCheck
        type="search"
        name="searchFilter"
        className="mR2 lh1 row"
        onChange={props.onSearch}
        placeholder="Search for an organization by name"
      />
      <select onBlur={props.onChange} onChange={props.onChange}>
        <option value="">
          Filter by Category
        </option>
        {categories.map(({display}) => (
          <option key={display} value={display}>
            {display}
          </option>
        ))}
      </select>
    </label>
    <div className="fx aiCtr mB2">
      <h2 className="fs3">
        {props.orgsToRender.length > 0 && `Organizations in ${props.city.name}`}
        {props.orgsToRender.length === 0 && 'No organizations found'}
      </h2>
    </div>
    <Orgs orgs={props.orgsToRender} />
  </>
));
