import React, { memo } from 'react';

import {Events, FilterPanel} from '../../../../../components';
import {tComponentProps} from './_types';

export const MeetingsComponent = memo((props: tComponentProps) => (
  <>
    {props.drafts && (
      <div className="bg-white br8 mb-3 p-3">
        <h2 className="fs3 mb-2">
          Finish Meeting Drafts
        </h2>
        <Events
          count={1}
          events={props.drafts}
          sessionRole="admin"
        />
      </div>
    )}
    <div className="bg-white br8 p-3">
      <h2 className="fs3 mb-2">
        Manage Meetings
      </h2>
      <FilterPanel
        className="bg-white br8 text-sm text-bold flex items-center mb-3"
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
