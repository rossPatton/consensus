import React from 'react';

import {OrganizationInfo, OrganizationTabs} from './_components';
import {Meetings, Members, PlanMeeting} from './_subpages';
import {tComponentProps} from './_types';

export const OrganizationComponent = (props: tComponentProps) => (
  <div className="contain mT4 fx aiStart">
    <OrganizationInfo
      org={props.org}
      params={props.match.params}
      role={props.role}
    />
    <div className="bgWhite br8 p3 row">
      <OrganizationTabs
        match={props.match}
        role={props.role}
      />
      {typeof props.match.params.section === 'undefined' && (
        <Meetings
          match={props.match}
          org={props.org}
          role={props.role}
          session={props.session}
          type="events"
        />
      )}
      {props.match.params.section === 'drafts' && (
        <Meetings
          match={props.match}
          org={props.org}
          role={props.role}
          session={props.session}
          type="drafts"
        />
      )}
      {props.match.params.section === 'members' && (
        <Members
          match={props.match}
          org={props.org}
          role={props.role}
          router={props.location}
          session={props.session}
        />
      )}
      {props.match.params.section === 'pending' && (
        <Members
          match={props.match}
          org={props.org}
          role={props.role}
          router={props.location}
          session={props.session}
        />
      )}
      {props.match.params.section === 'planMeeting' && (
        <PlanMeeting
          org={props.org}
          router={props.location}
        />
      )}
    </div>
  </div>
);
