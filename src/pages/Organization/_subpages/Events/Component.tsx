import React, { memo } from 'react';

import {Events} from '../../../../components';
import {tComponentProps} from './_types';

export const EventsComponent = memo((props: tComponentProps) => (
  <>
    <h2 className="mB2">Upcoming Events</h2>
    <Events events={props.events} />
  </>
));
