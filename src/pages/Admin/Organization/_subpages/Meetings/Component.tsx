import React, { memo } from 'react';

import {Events, FilterPanel} from '../../../../../components';
import {tComponentProps} from './_types';

export const MeetingsComponent = memo((props: tComponentProps) => (
  <>
    {props.drafts && (
      <div className="bg-white rounded mb-2 p-2">
        <h2 className="text-3 mb-2">
          Finish Meeting Drafts
        </h2>
        <Events
          count={1}
          events={props.drafts}
          sessionRole="admin"
        />
      </div>
    )}
    <div className="bg-white rounded p-2">
      <h2 className="text-3 mb-2">
        Manage Meetings
      </h2>
      <FilterPanel
        className="bg-white rounded text-sm font-bold flex items-center mb-2"
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
