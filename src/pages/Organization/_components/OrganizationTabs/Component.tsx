import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import { Tab } from './_components/Tab';

export const OrganizationTabs = memo((props: any) => {
  const { location, match } = props;
  console.log('tab props => ', props);
  return (
    <nav className="bgGrey1">
      <ul className="contain fx aiCtr jcCtr lsNone taCtr ovfScr">
        <li className="col m0">
          <Tab
            match={match}
            subRoute="overview"
          />
        </li>
        <li className="col m0 bgGrey2">
          <Tab
            match={match}
            subRoute="events"
          />
        </li>
        <li className="col m0 bgGrey2">
          <Tab
            match={match}
            subRoute="decisions"
          />
        </li>
      </ul>
    </nav>
  );
});
