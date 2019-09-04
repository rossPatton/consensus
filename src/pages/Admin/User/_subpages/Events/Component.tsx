import React, {memo} from 'react';

import {Events} from '../../../../../components';
import {tProps} from './_types';

export const EventsComponent = memo((props: tProps) => (
  <>
    <h1 className="fs2 mB3">Your Event RSVPs</h1>
    <Events
      events={props.events}
    />
  </>
));
