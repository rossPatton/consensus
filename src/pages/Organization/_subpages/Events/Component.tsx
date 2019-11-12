import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Events} from '../../../../components';
import {tComponentProps} from './_types';

export const EventsComponent = memo((props: tComponentProps) => (
  <>
    <div className="fx aiCtr mB2">
      <h2 className="col row">
        {props.showPast ? 'Past' : 'Upcoming'} {!props.role ? 'Public' : ''} Events
      </h2>
      <Link
        className="col row fs6 taR"
        to={`${props.pathname}?showPast=${!props.showPast}`}>
        {props.showPast && 'See upcoming events'}
        {!props.showPast && 'See past events'}
      </Link>
    </div>
    <div className="fx aiCtr p3 bgGrey1 br8 mB4 fs6 fw600">
      <label className="col row mR3" htmlFor="searchFilter">
        <div>Search:</div>
        <input
          spellCheck
          type="search"
          id="searchFilter"
          className="mR2 lh1 row"
          onChange={props.onSearchChange}
          placeholder="Search for an event by title"
        />
      </label>
      {props.role && (
        <div>
          Filter by privacy
          <select
            value={props.filterType}
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
      )}
    </div>
    <Events events={props.events} role={props.role} />
  </>
));
