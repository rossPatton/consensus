import _ from 'lodash';
import React, {memo} from 'react';

// import {Link} from 'react-router-dom';
import {FilterPanel, Orgs} from '../../../../../components';
import {tComponentProps} from './_types';

export const MembershipsComponent = memo((props: tComponentProps) => (
  <>
    <h1 className="fs3 mB3">
      Manage Groups
    </h1>
    <FilterPanel
      className="fx aiCtr mB3 fs6 fw600"
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
