import React, { memo } from 'react';

import {Events, FilterPanel} from '../../../../../components';
import {tComponentProps} from './_types';

export const MeetingsComponent = memo((props: tComponentProps) => (
  <>
    <h1 className="fs3 mB2">
      Manage Your Meetings
    </h1>
    <FilterPanel
      className="bgWhite br8 fs6 fw600 fx aiCtr mB3"
      onPublishedFilterChange={props.onPublishedFilterChange}
      onSearchChange={props.onSearchChange}
      publishedFilter={props.publishedFilter}
    />
    <Events
      events={props.events}
      sessionRole="admin"
    />
  </>
));
