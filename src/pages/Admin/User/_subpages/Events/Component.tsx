import React, {memo} from 'react';

import {Events, FilterPanel} from '../../../../../components';
import {tComponentProps} from './_types';

export const EventsComponent = memo((props: tComponentProps) => (
  <>
    <h1 className="fs2 mB3">Your Event RSVPs</h1>
    <FilterPanel
      filterOptions={[
        {key: 'title', display: 'Event Title'},
        {key: 'orgName', display: 'Organization Name'},
      ]}
      onSearchChange={props.onSearchChange}
      placeholder="Search for your event RSVPS by event title"
    />
    <Events events={props.events} type="events" />
  </>
));
