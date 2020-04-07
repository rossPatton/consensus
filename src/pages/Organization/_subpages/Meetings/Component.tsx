import React, { memo } from 'react';

import { Events, FilterPanel } from '../../../../components';
import { tComponentProps } from './_types';

export const EventsComponent = memo((props: tComponentProps) => (
  <>
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
  </>
));
