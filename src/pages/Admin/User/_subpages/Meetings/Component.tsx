import React, {memo} from 'react';

import {FilterPanel, Meetings} from '~app/components';

import {tComponentProps} from './_types';

export const MeetingsComponent = memo((props: tComponentProps) => (
  <>
    <ul className="flex flex-col d:flex-row items-center mb-2" role="navigation">
      <li>
        <h2 className="font-semibold">
          Upcoming meetings near {props.location}
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
    />
  </>
));
