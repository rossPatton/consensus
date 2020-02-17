import React, { memo } from 'react';

import {Events, FilterPanel} from '../../../../../components';
import {tComponentProps} from './_types';

export const EventsComponent = memo((props: tComponentProps) => (
  <>
    <h2 className="mB2">Manage Events</h2>
    <FilterPanel
      onSearchChange={props.onSearchChange}
    />
    <Events events={props.events} sessionRole="admin" />
  </>
));
