import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import { Tab } from './_components/Tab';

export const OrganizationTabsComponent = memo(({ location, match }: any) => {
  return (
    <nav className="bgGrey1">
      <ul className="contain fx aiCtr jcCtr lsNone taCtr ovfScr">
        <li className="col m0">
          <Link to="/us/ny/nyc/tech-workers-coalition">Overview</Link>
          {/* <Tab
            match={match}
            subRoute="/"
            text="Overview"
          /> */}
        </li>
        <li className="col m0 bgGrey2">
          <Link to="/us/ny/nyc/tech-workers-coalition/events">Events</Link>
          {/* <Tab
            match={match}
            subRoute="events"
            text="Events"
          /> */}
        </li>
        <li className="col m0 bgGrey2">
          <Link to="/us/ny/nyc/tech-workers-coalition/forum">Forum</Link>
          {/* <Tab
            match={match}
            subRoute="forum"
            text="Forum"
          /> */}
        </li>
        <li className="col m0 bgGrey2">
          <Link to="/us/ny/nyc/tech-workers-coalition/decisions">Decisions</Link>
          {/* <Tab
            match={match}
            subRoute="decisions"
            text="Decisions"
          /> */}
        </li>
        <li className="col m0 bgGrey2">
          <Link to="/us/ny/nyc/tech-workers-coalition/resources">Resources</Link>
          {/* <Tab
            match={match}
            subRoute="resources"
            text="Resources"
          /> */}
        </li>
      </ul>
    </nav>
  );
});
