import React, { memo } from 'react';

import {Events, FilterPanel} from '../../../../../components';
import {tComponentProps} from './_types';

export const MeetingsComponent = memo((props: tComponentProps) => (
  <>
    {props.drafts && (
      <div className="bgWhite br8 mB3 p3">
        <h2 className="fs3 mB2">
          Finish Meeting Drafts
        </h2>
        <Events
          count={1}
          events={props.drafts}
          sessionRole="admin"
        />
      </div>
    )}
    <div className="bgWhite br8 p3">
      <h2 className="fs3 mB2">
        Manage Meetings
      </h2>
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
    </div>
  </>
));
