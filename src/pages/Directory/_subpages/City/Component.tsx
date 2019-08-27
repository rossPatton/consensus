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
      <h1 className="mB3">
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
      {cityObj.orgs && (
        <ul className="fx fxWrap">
          {cityObj.orgs.map((org: tOrg, i) => (
            <li
              key={i}
              className="col p3 brdA1 br8 mB3 mL1 mR1"
              style={{width: '32%', maxWidth: '32%'}}>
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
