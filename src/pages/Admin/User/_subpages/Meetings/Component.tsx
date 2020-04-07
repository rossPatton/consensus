import React, {memo} from 'react';

import {Events, FilterPanel} from '../../../../../components';
import {tComponentProps} from './_types';

export const MeetingsComponent = memo((props: tComponentProps) => (
  <>
    <ul className="flex flex-col d:flex-row items-center mb-2" role="navigation">
      <li>
        <h1 className="text-2">
          Your RSVPs
        </h1>
      </li>
    </ul>
    <FilterPanel
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
