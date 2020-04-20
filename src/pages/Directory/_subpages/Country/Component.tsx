import pluralize from 'pluralize';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {FilterPanel} from '~app/components';

import {tComponentProps} from './_types';

export const CountryComponent = memo((props: tComponentProps) => (
  <>
    <h1 className="mb-2">
      {props.country.name}
    </h1>
    <FilterPanel
      className="flex flex-col d:flex-row items-center p-2 bg-white rounded mb-4 text-sm font-bold"
      onSearchChange={props.onChange}
    />
    <h2 className="mb-2 text-3">
      <span className="capitalize">
        {pluralize(props.country.regionType)} and Territories
      </span> in {props.country.name}
    </h2>
    <ul className="flex flex-col d:flex-row flex-wrap">
      {props.regionsToRender.map(region => (
        <li
          key={region.name}
          className="flex-grow-0 d:w-1/3 mb-2">
          <Link
            to={`${props.match.url}/${region.code}`}
            className="text-gray-5 font-bold no-underline">
            {region.name}
          </Link>
        </li>
      ))}
    </ul>
  </>
));
