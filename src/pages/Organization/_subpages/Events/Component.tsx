import React, { memo } from 'react';

import { Events } from '../../../../components';
import { tComponentProps } from './_types';

export const EventsComponent = memo((props: tComponentProps) => (
  <>
    {props.events.length === 0 && (
      <h2>No {props.type === 'events' ? 'upcoming events!' : 'drafts'}</h2>
    )}
    {props.events.length > 0 && (
      <>
        <Events
          events={props.events}
          match={props.match}
          role={props.role}
        />
      </>
    )}
  </>
));
