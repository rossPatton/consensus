import React, { memo } from 'react';

import { Events, FilterPanel } from '../../../../components';
import { tComponentProps } from './_types';

export const EventsComponent = memo((props: tComponentProps) => (
  <>
    {props.originalEvents.length === 0
      && !props.hideMeetings
      && (
        <h2 className="fs3 mb-3">
          This group has no upcoming meetings.
        </h2>
      )}
    {props.hideMeetings
      && (
        <h2 className="fs3 p4">
          This is a private group. Only members can see upcoming meetings.
        </h2>
      )}
    {!props.hideMeetings
      && (
        <>
          <FilterPanel
            className="flex flex-col d:flex-row items-center mb-3 text-sm text-bold"
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
