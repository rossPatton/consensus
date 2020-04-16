import { FilterPanel, Orgs } from '@app/components';
import React, { memo } from 'react';

import { tComponentProps } from './_types';

export const CityComponent = memo((props: tComponentProps) => (
  <>
    <h1 className="mb-1">
      Browse {props.city.orgs.length} {props.category} groups in {props.city.name}
    </h1>
    <FilterPanel
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
