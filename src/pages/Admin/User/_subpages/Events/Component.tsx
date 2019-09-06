import React, {memo} from 'react';

import {Events} from '../../../../../components';
import {tComponentProps} from './_types';

export const EventsComponent = memo((props: tComponentProps) => (
  <>
    <h1 className="fs2 mB3">Your Event RSVPs</h1>
    <label
      htmlFor="searchFilter"
      className="fx aiCtr p3 bgGrey1 br8 mB4">
      <input
        spellCheck
        type="search"
        id="searchFilter"
        className="mR2 lh1 row"
        onChange={props.onSearchChange}
        placeholder="Search for an event by title"
      />
    </label>
    <Events
      events={props.events}
    />
  </>
));
