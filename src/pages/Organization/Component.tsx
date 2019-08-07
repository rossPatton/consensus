import React, { memo } from 'react';

import { Decisions, Events, Forum, Overview, Resources } from './_subpages';
import { tProps } from './_types';
import { OrganizationHeader, OrganizationTabs } from './_components';

export const OrganizationComponent = memo((props: tProps) => (
  <>
    <OrganizationHeader
      org={props.org}
      usersByOrg={props.usersByOrg}
    />
    <OrganizationTabs
      location={props.location}
      match={props.match}
    />
    {!props.match.params.section && (
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
      <Events />
    )}
    {props.match.params.section === 'forum' && (
      <Forum />
    )}
    {props.match.params.section === 'resources' && (
      <Resources />
    )}
    <footer className="bgBlue white pT5 pB5">
      <div className="contain">
        @copyright etc
      </div>
    </footer>
  </>
));
