import { Events, FilterPanel } from '@app/components';
import React, { memo } from 'react';

import { tComponentProps } from './_types';

export const EventsComponent = memo((props: tComponentProps) => (
  <div className="bg-white rounded p-2">
    {props.originalEvents.length === 0
      && !props.hideMeetings
      && (
        <h3>
          This group has no upcoming meetings.
        </h3>
      )}
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
            placeholder="Filter events by title"
          />
          <Events
            showRSVPs
            events={props.events}
            sessionRole={props.role}
            type={props.type}
          />
        </>
      )}
  </div>
));
