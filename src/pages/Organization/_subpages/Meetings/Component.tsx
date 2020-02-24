import React, { memo } from 'react';

import { Events, FilterPanel } from '../../../../components';
import { tComponentProps } from './_types';

export const EventsComponent = memo((props: tComponentProps) => (
  <>
    {props.originalEvents.length === 0
      && !props.hideMeetings
      && (
        <h2 className="fs3 mB3">
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
            className="fx aiCtr mB3 fs6 fw600"
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
    {/* {!props.hideMeetings && (
      <Events
        showRSVPs
        events={props.events}
        sessionRole={props.role}
        type={props.type}
      />
    )} */}
  </>
));
