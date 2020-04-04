import pluralize from 'pluralize';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {FilterPanel} from '../../../../components';
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
    <h2 className="mb-2 fs3">
      <span className="capitalize">
        {pluralize(props.country.regionType)} and Territories
      </span> in {props.country.name}
    </h2>
    <ul className="flex flex-col d:flex-row fxWrap">
      {props.regionsToRender.map(region => (
        <li
          key={region.name}
          className=" fxg0 third mb-2">
          <Link
            to={`${props.match.url}/${region.code}`}
            className="copyBlack font-bold no-underline">
            {region.name}
          </Link>
        </li>
      ))}
    </ul>
  </>
));
