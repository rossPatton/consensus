import React from 'react';

import {UserBar} from './_components';
import {OrganizationHeader, OrganizationTabs} from './_components';
import {AdminEvent, Decisions, Events, Overview} from './_subpages';
import {tProps} from './_types';

export const OrganizationComponent = (props: tProps) => (
  <>
    <OrganizationHeader
      org={props.org}
      params={props.match.params}
    />
    <OrganizationTabs
      match={props.match}
    />
    <UserBar
      match={props.match}
      org={props.org}
    />
    <div className="contain mB4">
      {props.match.params.section === 'overview' && (
        <Overview
          org={props.org}
        />
      )}
      {props.match.params.section === 'decisions' && (
        <Decisions
          match={props.match}
          org={props.org}
        />
      )}
      {props.match.params.section === 'events' && (
        <Events
          match={props.match}
          org={props.org}
        />
      )}
      {props.match.params.section === 'createEvent' && (
        <AdminEvent
          org={props.org}
        />
      )}
    </div>
    {/* {props.match.params.section === 'forum' && (
      <Forum />
    )}
    {props.match.params.section === 'resources' && (
      <Resources />
    )} */}
  </>
);
