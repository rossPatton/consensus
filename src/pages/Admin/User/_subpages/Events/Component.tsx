import React, {memo} from 'react';

import {Events, Paginate} from '../../../../../components';
import {tProps} from './_types';

export const EventsComponent = (props: tProps) => (
    <>
      <h1 className="fs2 mB3">Your Event RSVPs</h1>
      <Events
        events={props.eventsToRender}
      />
      <Paginate
        match={props.match}
        total={props.allEvents.length}
      />
    </>
);
