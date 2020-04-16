import {Events, FilterPanel} from '@app/components';
import React, {memo} from 'react';

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
        {key: 'title', display: 'Title'},
        {key: 'orgName', display: 'Group'},
      ]}
    />
    <Events
      events={props.events}
      showOrgName
      type="rsvps"
    />
  </>
));
