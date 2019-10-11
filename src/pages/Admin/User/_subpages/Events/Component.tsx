import React, {memo} from 'react';

import {Events} from '../../../../../components';
import {tComponentProps} from './_types';

export const EventsComponent = memo((props: tComponentProps) => (
  <>
    <h1 className="fs2 mB3">Your Event RSVPs</h1>
    <div className="fx aiCtr p3 bgGrey1 br8 mB4 fs6 fw600">
      <label className="col row mR3" htmlFor="searchFilter">
        Search:
        <input
          spellCheck
          type="search"
          id="searchFilter"
          className="mR2 lh1 row"
          onChange={props.onSearchChange}
          placeholder="Search for an event by title"
        />
      </label>
      <div className="mR3">
        Filter by privacy
        <select
          onBlur={props.onPrivacyFilterChange}
          onChange={props.onPrivacyFilterChange}>
          <option value="n/a">
            All Events
          </option>
          <option value="private">
            Private Events
          </option>
          <option value="public">
            Public Events
          </option>
        </select>
      </div>
    </div>
    <Events
      events={props.events}
    />
  </>
));
