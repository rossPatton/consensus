import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Events, FilterPanel} from '../../../../../components';
import {tComponentProps} from './_types';

export const EventsComponent = memo((props: tComponentProps) => (
  <>
    <ul className="fx aiCtr mB3" role="navigation">
      <li>
        <h1 className="fs3 mR3">
          <Link to="">
            All RSVPs
          </Link>
        </h1>
      </li>
      <li>
        <h2 className="grey3 fs3">
          All Group Meetings
        </h2>
      </li>
    </ul>
    <FilterPanel
      className="fx aiCtr mB4 fs6 fw600"
      onFilterOptionChange={props.onFilterOptionChange}
      onSearchChange={props.onSearchChange}
      filterOptions={[
        {key: 'title', display: 'Event Title'},
        {key: 'orgName', display: 'Organization Name'},
      ]}
    />
    <Events events={props.events} isDashboard />
  </>
));
