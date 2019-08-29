import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {slugify } from '../../../../utils';
import {tProps} from './_types';

export const CityComponent = memo((props: tProps) => {
  const {city: cityObj, match} = props;
  const {city, region, country} = match.params;
  const urlPrefix = `/org/${country}/${region}/${city}`;

  return (
    <>
      {console.log('orgsToRender => ', props.orgsToRender)}
      <h1>
        {cityObj.name}
      </h1>
      <h2 className="mB2 fs3">
        Organizations in {cityObj.name}
      </h2>
      {!cityObj.orgs || cityObj.orgs.length === 0 && (
        <div>
        No organizations found for {cityObj.name}
        </div>
      )}
      <div className="fx aiCtr p3 bgGrey1 br8 mB3">
        <input
          spellCheck
          type="search"
          className="mR2 lh1 row"
          onChange={props.onChange}
          placeholder="Search for an organization by name"
        />
        <button
          type="button"
          className="bgWhite p3 pL4 pR4 lh1 fs5">
          Search
        </button>
      </div>
      {props.orgsToRender.length > 0 && (
        <ul className="fx fxWrap">
          {props.orgsToRender.map((org: tOrg, i) => (
            <li
              key={i}
              className="col fxg0 third p3 brdA1 br8 mB3 trans2">
              <div className="fs6 lh1 mB2">
                {org.category}
              </div>
              <Link
                className="dBl lh1 mB3 fs3"
                to={`${urlPrefix}/${slugify(org.name)}/overview`}>
                {org.name}
              </Link>
              <div className="fs6 lh1">
                {org.membershipTotal} members
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
});
