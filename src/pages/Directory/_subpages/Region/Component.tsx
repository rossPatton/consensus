import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {FilterPanel} from '../../../../components';
import {slugify} from '../../../../utils';
import {tComponentProps} from './_types';

export const RegionComponent = memo((props: tComponentProps) => (
  <>
    <h1 className="mB2">
      {props.region.name}
    </h1>
    <FilterPanel
      className="fx aiCtr p3 bgWhite br8 mB4 fs6 fw600"
      onSearchChange={props.onChange}
    />
    <h2 className="mB2 fs3">
      {props.citiesToRender.length > 0 && `Cities in ${props.region.name}`}
      {props.citiesToRender.length === 0 && 'No cities found'}
    </h2>
    <ul className="fx fxWrap">
      {props.citiesToRender.map((city, i) => (
        <li
          key={i}
          className="col fxg0 third mB3">
          <Link
            to={`${props.match.url}/${slugify(city.name)}`}
            className="copyBlack fw600 noUnderline">
            {city.name}
          </Link>
        </li>
      ))}
    </ul>
  </>
));
