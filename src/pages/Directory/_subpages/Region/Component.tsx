import React, {memo} from 'react';
import {Link} from 'react-router-dom';
import {slugify} from '../../../../utils';
import {tProps} from './_types';

export const RegionComponent = memo((props: tProps) => {
  const {region, match} = props;
  return (
    <>
      <h1 className="mB3">
        {region.name}
      </h1>
      <h2 className="mB2 fs3">
        Cities in {region.name}
      </h2>
      <ul className="fx fxWrap">
        {region.cities && region.cities.map((city: tCity, i) => (
          <li
            key={i}
            className="col"
            style={{width: '32%', maxWidth: '32%'}}>
            <Link
              to={`${match.url}/${slugify(city.name)}`}
              className="dBl p3 brdA1 br8 mB3 mL1 mR1 hvrBgGrey1 trans1">
              {city.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
});
