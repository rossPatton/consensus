import React, { memo } from 'react';

import {Events} from '../../../../components';
import {tProps} from './_types';

export const EventsComponent = memo((props: tProps) => (
  <>
    <h2 className="mB2">Upcoming Events</h2>
    <Events events={props.events} role={props.role} />
  </>
));
