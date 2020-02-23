import React, { memo } from 'react';

import { FilterPanel, Orgs } from '../../../../components';
import { tComponentProps } from './_types';

export const CityComponent = memo((props: tComponentProps) => (
  <>
    <h1 className="mB1">
      Browse groups in {props.city.name}
    </h1>
    <h2 className="fs3 mB2">
      {props.city.orgs.length} Groups
    </h2>
    <FilterPanel
      className="fx aiCtr p3 bgWhite br8 mB4 fs6 fw600"
      onCategoryChange={props.onChange}
      onSearchChange={props.onSearch}
      placeholder="Filter by group name"
    />
    <Orgs count={16} orgs={props.orgsToRender} />
  </>
));
