import React, {memo} from 'react';

import {Events} from '../../../../components';
import {tComponentProps} from './_types';

export const EventsComponent = memo((props: tComponentProps) => (
  <>
    <div className="fx aiCtr mB2">
      <h2 className="col">
        {props.showPast ? 'Past' : 'Upcoming'} {!props.role ? 'Public' : ''} Meetings
      </h2>
      <button
        onClick={props.togglePast}
        className="trans1 hvrBgGrey1">
        {props.showPast && 'See upcoming meetings'}
        {!props.showPast && 'See past meetings'}
      </button>
    </div>
    <div className="fx aiCtr p3 bgGrey1 br8 mB4 fs6 fw600">
      <label className="col row mR3" htmlFor="searchFilter">
        <div>Search</div>
        <input
          spellCheck
          type="search"
          id="searchFilter"
          className="mR2 lh1 row"
          onChange={props.onSearchChange}
          placeholder="Search for a meeting by title"
        />
      </label>
      {props.role && (
        <div>
          Filter by privacy
          <select
            value={props.privacyFilter}
            onBlur={props.onPrivacyFilterChange}
            onChange={props.onPrivacyFilterChange}>
            <option value="n/a">
              All Meetings
            </option>
            <option value="private">
              Private Meetings
            </option>
            <option value="public">
              Public Meetings
            </option>
          </select>
        </div>
      )}
    </div>
    <Events
      events={props.events}
      match={props.match}
      role={props.role}
    />
  </>
));
