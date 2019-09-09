import React, { memo } from 'react';

import {Events} from '../../../../../../components';
import {tComponentProps} from './_types';

export const EventsComponent = memo((props: tComponentProps) => (
  <>
    <h2 className="mB2">Manage Events</h2>
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
    <Events isEditable events={props.events} />
  </>
));