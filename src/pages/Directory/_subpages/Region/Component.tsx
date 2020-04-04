import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {FilterPanel} from '../../../../components';
import {slugify} from '../../../../utils';
import {tComponentProps} from './_types';

export const RegionComponent = memo((props: tComponentProps) => (
  <>
    <h1 className="mb-2">
      {props.region.name}
    </h1>
    <FilterPanel
      className="flex flex-col d:flex-row items-center p-2 bg-white rounded mb-4 text-sm font-bold"
      onSearchChange={props.onChange}
    />
    <h2 className="mb-2 fs3">
      {props.citiesToRender.length > 0 && `Cities in ${props.region.name}`}
      {props.citiesToRender.length === 0 && 'No cities found'}
    </h2>
    <ul className="flex flex-col d:flex-row fxWrap">
      {props.citiesToRender.map((city, i) => (
        <li
          key={i}
          className=" fxg0 third mb-2">
          <Link
            to={`${props.match.url}/${slugify(city.name)}`}
            className="copyBlack font-bold no-underline">
            {city.name}
          </Link>
        </li>
      ))}
    </ul>
  </>
));
