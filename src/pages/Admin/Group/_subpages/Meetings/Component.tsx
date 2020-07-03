import React, { memo } from 'react';

import {FilterPanel, Meetings} from '~app/components';

import {tComponentProps} from './_types';

export const MeetingsComponent = memo((props: tComponentProps) => (
  <>
    {props.drafts
      && props.drafts.length > 0
      && (
        <div className="rounded d:border d:shadow d:p-2 mb-2">
          <h2 className="text-3 mb-1 font-bold">
            Finish Meeting Drafts
          </h2>
          <Meetings
            count={1}
            meetings={props.drafts}
            sessionRole="admin"
            type="drafts"
          />
        </div>
      )}
    <div className="rounded d:border d:shadow d:p-2">
      <h2 className="text-3 mb-1 font-bold">
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
