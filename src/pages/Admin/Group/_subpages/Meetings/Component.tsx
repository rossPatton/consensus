import React, { memo } from 'react';

import {FilterPanel, Meetings} from '~app/components';

import {tComponentProps} from './_types';

export const MeetingsComponent = memo((props: tComponentProps) => (
  <>
    {props.drafts && (
      <div className="bg-white rounded mb-2 p-2">
        <h2 className="text-3 mb-1">
          Finish Meeting Drafts
        </h2>
        <Meetings
          count={1}
          meetings={props.drafts}
          sessionRole="admin"
        />
      </div>
    )}
    <div className="bg-white rounded p-2">
      <h2 className="text-3 mb-1">
        Manage Meetings
      </h2>
      <FilterPanel
        onPublishedFilterChange={props.onPublishedFilterChange}
        onSearchChange={props.onSearchChange}
        publishedFilter={props.publishedFilter}
      />
      <Meetings
        meetings={props.meetings}
        sessionRole="admin"
      />
    </div>
  </>
));
