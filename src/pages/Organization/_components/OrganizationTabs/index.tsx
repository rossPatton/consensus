import React, {memo} from 'react';

import {Tab} from './_components';
import {tProps} from './_types';

const OrganizationTabs = memo((props: tProps) => {
  const isMod = props.role === 'admin' || props.role === 'facilitator';

  return (
    <nav className="mb-1 d:mb-2 overflow-scroll">
      <ul className="flex">
        <li>
          <Tab
            match={props.match}
            subRoute=""
          />
        </li>
        {isMod
          && (
            <li className='hidden d:block'>
              <Tab
                match={props.match}
                subRoute="pending"
              />
            </li>
          )}
        {isMod
          && (
            <li className='hidden d:block'>
              <Tab
                match={props.match}
                subRoute="drafts"
              />
            </li>
          )}
        {isMod
          && (
            <li className='hidden d:block'>
              <Tab
                match={props.match}
                subRoute="planMeeting"
              />
            </li>
          )}
      </ul>
    </nav>
  );
});

export default OrganizationTabs;
