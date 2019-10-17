import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {objToQueryString, slugify} from '../../../../utils';
import {tProps} from './_types';

export const CityComponent = memo((props: tProps) => {
  const {city: cityObj, match} = props;
  const {city, region, country} = match.params;
  const urlPrefix = `/org/${country}/${region}/${city}`;

  return (
    <>
      <h1>
        {cityObj.name}
      </h1>
      <label
        htmlFor="searchFilter"
        className="fx aiCtr p3 bgGrey1 br8 mB4">
        <input
          spellCheck
          type="search"
          id="searchFilter"
          className="mR2 lh1 row"
          onChange={props.onSearch}
          placeholder="Search for an organization by name"
        />
        <select onBlur={props.onChange} onChange={props.onChange}>
          <option value="">
            Filter by Category
          </option>
          {props.categories.map((category: string, i) => (
            <option key={i} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
      <div className="fx aiCtr mB2">
        <h2 className="fs3">
          {props.orgsToRender.length > 0 && `Organizations in ${cityObj.name}`}
          {props.orgsToRender.length === 0 && 'No organizations found'}
        </h2>
      </div>
      {props.orgsToRender.length > 0 && (
        <ul className="fx fxWrap">
          {props.orgsToRender.map((org: tOrg, i) => (
            <li
              key={i}
              className="col fxg0 third mB3">
              <Link
                to={`/org/${org.id}/overview`}
                className="dBl fs6 lh1 p3 brdA1 br8 hvrBgGrey1 trans2 noUnderline">
                {org.category}
                <span className="dBl lh1 fs3 mT1 mB3 underline">
                  {org.name}
                </span>
                {org.membershipTotal} members
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
});
