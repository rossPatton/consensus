import React, {memo} from 'react';

import {Events, FilterPanel} from '../../../../../components';
import {tComponentProps} from './_types';

export const MeetingsComponent = memo((props: tComponentProps) => (
  <>
    <ul className="flex flex-col d:flex-row items-center mb-3" role="navigation">
      <li>
        <h1 className="fs3 mr-3">
          Your RSVPs
        </h1>
      </li>
    </ul>
    <FilterPanel
      className="flex flex-col d:flex-row items-center mb-4 text-sm text-bold"
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
      type="rsvps"
    />
  </>
));
