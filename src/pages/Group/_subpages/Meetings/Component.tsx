import React, { memo } from 'react';

import { FilterPanel, Meetings } from '~app/components';

import { tComponentProps } from './_types';

export const MeetingsComponent = memo((props: tComponentProps) => (
  <div className="d:pb-2 d:pl-2 d:pr-2">
    {props.hideMeetings
      && (
        <h3>
          This is a private group. Only members can see upcoming meetings.
        </h3>
      )}
    {!props.hideMeetings
      && (
        <>
          <FilterPanel
            onSearchChange={props.onSearchChange}
            placeholder="Filter meetings by title"
          />
          <Meetings
            showRSVPs
            meetings={props.meetings}
            sessionRole={props.role}
            type={props.type}
          />
        </>
      )}
  </div>
));
