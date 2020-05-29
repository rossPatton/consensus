import React, {memo} from 'react';

import {FilterPanel, Meetings} from '~app/components';

import {tComponentProps} from './_types';

export const RSVPsComponent = memo((props: tComponentProps) => (
  <>
    <ul className="flex flex-col d:flex-row items-center mb-2" role="navigation">
      <li>
        <h2 className="font-semibold">
          Your RSVPs
        </h2>
      </li>
    </ul>
    <FilterPanel
      onFilterOptionChange={props.onFilterOptionChange}
      onSearchChange={props.onSearchChange}
      filterOptions={[
        {key: 'title', display: 'Title'},
        {key: 'groupName', display: 'Group'},
      ]}
    />
    <Meetings
      meetings={props.meetings}
      showOrgName
      type="rsvps"
    />
  </>
));
