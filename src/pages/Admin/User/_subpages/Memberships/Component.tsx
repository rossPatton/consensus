// import {Link} from 'react-router-dom';
import _ from 'lodash';
import React, {memo} from 'react';

import {FilterPanel, Groups} from '~app/components';

import {tComponentProps} from './_types';

export const MembershipsComponent = memo((props: tComponentProps) => (
  <>
    <h2 className="font-semibold">
      Manage Groups
    </h2>
    <FilterPanel
      className="flex flex-col d:flex-row items-center mb-2 text-sm font-bold"
      onSearchChange={props.onSearchChange}
      placeholder="Filter groups by name"
    />
    <Groups
      asList
      isEditable
      groups={props.groups}
      showPending
    />
  </>
));
