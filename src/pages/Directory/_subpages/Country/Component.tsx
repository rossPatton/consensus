import pluralize from 'pluralize';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {FilterPanel} from '../../../../components';
import {tComponentProps} from './_types';

export const CountryComponent = memo((props: tComponentProps) => (
  <>
    <h1 className="mB2">
      {props.country.name}
    </h1>
    <FilterPanel
      className="fx aiCtr p3 bgWhite br8 mB4 fs6 fw600"
      onSearchChange={props.onChange}
    />
    <h2 className="mB3 fs3">
      <span className="ttCap">
        {pluralize(props.country.regionType)} and Territories
      </span> in {props.country.name}
    </h2>
    <ul className="fx fxWrap">
      {props.regionsToRender.map(region => (
        <li
          key={region.name}
          className="col fxg0 third mB3">
          <Link
            to={`${props.match.url}${region.code}`}
            className="copyBlack fw600 noUnderline">
            {region.name}
          </Link>
        </li>
      ))}
    </ul>
  </>
));
