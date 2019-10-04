import React, { memo } from 'react';

import {Events} from '../../../../../components';
import {tComponentProps} from './_types';

export const EventsComponent = memo((props: tComponentProps) => (
  <>
    <h2 className="mB2">Manage Events</h2>
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
            Public & Private Events
          </option>
          <option value="private">
            Private Events Only
          </option>
          <option value="public">
            Public Events Only
          </option>
        </select>
      </div>
      <div>
        Filter drafts
        <select
          onBlur={props.onPublishedFilterChange}
          onChange={props.onPublishedFilterChange}>
          <option value="n/a">
            Published Events & Drafts
          </option>
          <option value="published">
            Published Events Only
          </option>
          <option value="draft">
            Drafts Only
          </option>
        </select>
      </div>
    </div>
    {/* eslint-disable */}
    <Events events={props.events} role="admin" />
    {/* eslint-enable */}
  </>
));
