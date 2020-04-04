import React, { memo } from 'react';

import { FilterPanel, Orgs } from '../../../../components';
import { tComponentProps } from './_types';

export const CityComponent = memo((props: tComponentProps) => (
  <>
    <h1 className="mb-1">
      Browse groups in {props.city.name}
    </h1>
    <h2 className="fs3 mb-2">
      {props.city.orgs.length} Groups
    </h2>
    <FilterPanel
      className="flex flex-col d:flex-row items-center p-2 bg-white rounded mb-4 text-sm font-bold"
      onCategoryChange={props.onChange}
      onSearchChange={props.onSearch}
      placeholder="Filter by group name"
    />
    <Orgs
      count={16}
      orgs={props.orgsToRender}
      showType
    />
  </>
));
