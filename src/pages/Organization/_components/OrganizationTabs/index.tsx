import React, {memo} from 'react';

import {Tab} from './_components';
import {tProps} from './_types';

const OrganizationTabs = memo((props: tProps) => {
  const isMod = props.role === 'admin' || props.role === 'facilitator';

  return (
    <nav className="mb-2">
      <ul className="flex flex-col d:flex-row items-center overflow-scroll">
        <li>
          <Tab
            match={props.match}
            subRoute=""
          />
        </li>
        {isMod
          && (
            <li>
              <Tab
                match={props.match}
                subRoute="pending"
              />
            </li>
          )}
        {isMod
          && (
            <li>
              <Tab
                match={props.match}
                subRoute="drafts"
              />
            </li>
          )}
        {isMod
          && (
            <li>
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
