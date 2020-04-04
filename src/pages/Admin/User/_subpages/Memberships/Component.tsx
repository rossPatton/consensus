import _ from 'lodash';
import React, {memo} from 'react';

// import {Link} from 'react-router-dom';
import {FilterPanel, Orgs} from '../../../../../components';
import {tComponentProps} from './_types';

export const MembershipsComponent = memo((props: tComponentProps) => (
  <>
    <h1 className="fs3 mb-2">
      Manage Groups
    </h1>
    <FilterPanel
      className="flex flex-col d:flex-row items-center mb-2 text-sm font-bold"
      onSearchChange={props.onSearchChange}
      placeholder="Filter groups by name"
    />
    <Orgs
      asList
      isEditable
      orgs={props.orgs}
      showPending
    />
  </>
));
