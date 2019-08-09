import React, { memo } from 'react';

import { Decisions, Events, Forum, Overview, Resources, AdminEvent } from './_subpages';
import { tProps } from './_types';
import { OrganizationHeader, OrganizationTabs } from './_components';

export const OrganizationComponent = memo((props: tProps) => (
  <>
    <OrganizationHeader
      org={props.org}
    />
    <OrganizationTabs
      location={props.location}
      match={props.match}
    />
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
    {/* {props.match.params.section === 'forum' && (
      <Forum />
    )}
    {props.match.params.section === 'resources' && (
      <Resources />
    )} */}
  </>
));
