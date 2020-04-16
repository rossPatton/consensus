import {PlanMeeting} from '@app/components';
import React from 'react';

import {OrganizationInfo, OrganizationTabs} from './_components';
import {Meetings, Members} from './_subpages';
import {tComponentProps} from './_types';

export const OrganizationComponent = (props: tComponentProps) => (
  <div className="flex flex-col d:flex-row items-start">
    <OrganizationInfo
      match={props.match}
      org={props.org}
      params={props.match.params}
      role={props.role}
    />
    <div className="min-w-full d:min-w-2/3">
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
        />
      )}
      {props.match.params.section === 'drafts' && (
        <Meetings
          match={props.match}
          org={props.org}
          role={props.role}
          session={props.session}
        />
      )}
      {props.match.params.section === 'members' && (
        <Members
          match={props.match}
          group={props.org}
          role={props.role}
        />
      )}
      {props.match.params.section === 'pending' && (
        <Members
          match={props.match}
          group={props.org}
          role={props.role}
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
