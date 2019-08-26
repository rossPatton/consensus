import React, {memo} from 'react';
import {Link} from 'react-router-dom';
import {slugify } from '../../../../utils';
import {tProps} from './_types';

export const CityComponent = memo((props: tProps) => {
  const {city, match} = props;

  return (
    <>
      <h1 className="mB3">
        {city.name}
      </h1>
      <h2 className="mB2 fs3">
        Organizations in {city.name}
      </h2>
      {!city.orgs || city.orgs.length === 0 && (
        <div>
          No organizations found for {city.name}
        </div>
      )}
      {city.orgs && (
        <ul className="fx fxWrap">
          {city.orgs.map((org: tOrg, i) => (
            <li
              key={i}
              className="col p3 brdA1 br8 mB3 mL1 mR1"
              style={{width: '32%', maxWidth: '32%'}}>
              <div className="fs6 lh1 mB2">
                {org.category}
              </div>
              <Link
                className="dBl lh1 mB3 fs3"
                to={`${match.url}/${slugify(org.name)}/overview`}>
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
