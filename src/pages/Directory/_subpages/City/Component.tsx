import React, { memo } from 'react';

import { FilterPanel, Groups } from '~app/components';

import { tComponentProps } from './_types';

export const CityComponent = memo((props: tComponentProps) => (
  <>
    {props.city && (
      <h1 className="mb-1">
        Browse {props.city.groups && props.city.groups.length} {props.category} groups {props.city.name && `in ${props.city.name}`}
      </h1>
    )}
    <FilterPanel
      onCategoryChange={props.onChange}
      onSearchChange={props.onSearch}
      placeholder="Filter by group name"
    />
    <Groups
      count={16}
      groups={props.groupsToRender}
      showType
    />
  </>
));
