import React, { memo } from 'react';
import { Events, Paginate } from '../../../../components';
import { tComponentProps } from './_types';

export const EventsComponent = memo((props: tComponentProps) => (
  <div className="contain ffLab pB5 mB5 pT3">
    <h2 className="mB3">Upcoming Events</h2>
    <Events events={props.eventsToRender} />
    <Paginate match={props.match} items={props.allEvents} />
  </div>
));
