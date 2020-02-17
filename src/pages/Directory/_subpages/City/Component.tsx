import React, { memo } from 'react';

import { FilterPanel, Orgs } from '../../../../components';
import { tComponentProps } from './_types';

export const CityComponent = memo((props: tComponentProps) => (
  <>
    <h1 className="mB2">
      {props.city.name}
    </h1>
    <FilterPanel
      className="fx aiCtr p3 bgWhite br8 mB4 fs6 fw600"
      onCategoryChange={props.onChange}
      onSearchChange={props.onSearch}
    />
    <div className="fx aiCtr mB2">
      <h2 className="fs3">
        {props.orgsToRender.length > 0 && `Groups in ${props.city.name}`}
        {props.orgsToRender.length === 0 && `No groups found in ${props.city.name}`}
      </h2>
    </div>
    <Orgs orgs={props.orgsToRender} />
  </>
));
