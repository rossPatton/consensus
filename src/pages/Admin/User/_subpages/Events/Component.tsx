import React, {memo} from 'react';

import {Events, FilterPanel} from '../../../../../components';
import {tComponentProps} from './_types';

export const EventsComponent = memo((props: tComponentProps) => (
  <>
    <ul className="fx aiCtr mB3" role="navigation">
      <li>
        <h1 className="fs3 mR3">
          Your RSVPs
        </h1>
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
    <Events
      events={props.events}
      showOrgName
    />
  </>
));
