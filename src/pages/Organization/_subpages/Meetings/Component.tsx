import React, { memo } from 'react';

import { Events, FilterPanel } from '../../../../components';
import { tComponentProps } from './_types';

export const EventsComponent = memo((props: tComponentProps) => (
  <>
    {props.events.length === 0 && (
      <h2 className="fs3 p4">
        This group has no upcoming meetings.
      </h2>
    )}
    {props.events.length > 0 && (
      <>
        <FilterPanel
          className="fx aiCtr mB3 fs6 fw600"
          onSearchChange={props.onSearchChange}
          placeholder="Search for events by title"
        />
        <Events
          events={props.events}
          sessionRole={props.role}
          type={props.type}
        />
      </>
    )}
  </>
));
