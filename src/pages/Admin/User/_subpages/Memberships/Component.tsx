import _ from 'lodash';
import React, {memo} from 'react';

// import {Link} from 'react-router-dom';
import {FilterPanel, Orgs} from '../../../../../components';
import {tComponentProps} from './_types';

export const MembershipsComponent = memo((props: tComponentProps) => (
  <>
    <h1 className="fs3 mB3">
      All your groups
    </h1>
    <FilterPanel
      className="fx aiCtr mB4 fs6 fw600"
      onSearchChange={props.onSearchChange}
      placeholder="Search for a group by name"
    />
    <Orgs asList isEditable orgs={props.orgs} />
  </>
));
