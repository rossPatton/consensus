import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {FilterPanel} from '~app/components';
import {slugify} from '~app/utils';

import {tComponentProps} from './_types';

export const RegionComponent = memo((props: tComponentProps) => (
  <>
    <h1 className="mb-2">
      {props.region.name}
    </h1>
    <FilterPanel
      onSearchChange={props.onChange}
    />
    <h2 className="mb-2 text-3">
      {props.citiesToRender.length > 0 && `Cities in ${props.region.name}`}
      {props.citiesToRender.length === 0 && 'No cities found'}
    </h2>
    <ul className="flex flex-col d:flex-row flex-wrap">
      {props.citiesToRender.map((city, i) => (
        <li
          key={i}
          className="flex-grow-0 d:w-4/12 mb-2">
          <Link
            to={`${props.match.url}/${slugify(city.name)}`}
            className="text-gray-5 font-bold no-underline">
            {city.name}
          </Link>
        </li>
      ))}
    </ul>
  </>
));
