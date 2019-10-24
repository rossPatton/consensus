import pluralize from 'pluralize';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {tComponentProps} from './_types';

export const CountryComponent = memo((props: tComponentProps) => (
  <>
    <h1>
      {props.country.name}
    </h1>
    <label
      htmlFor="searchFilter"
      className="fx aiCtr p3 bgGrey1 br8 mB4">
      <input
        spellCheck
        type="search"
        id="searchFilter"
        className="mR2 lh1 row"
        onChange={props.onChange}
        placeholder="Search for a region/state by name"
      />
    </label>
    <h2 className="mB2 fs3">
      <span className="ttCap">
        {pluralize(props.country.regionType)}, Regions and Territories
      </span> in {props.country.name}
    </h2>
    <ul className="fx fxWrap">
      {props.regionsToRender.map((region: tRegion) => (
        <li
          key={region.name}
          className="col"
          style={{width: '32%', maxWidth: '32%'}}>
          <Link
            to={`${props.match.url}/${region.code}`}
            className="dBl p3 brdA1 br8 mB3 mL1 mR1 hvrBgGrey1 trans1">
            {region.name}
          </Link>
        </li>
      ))}
    </ul>
  </>
));
