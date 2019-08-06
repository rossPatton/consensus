import React, { memo } from 'react';

import { Decisions, Overview } from '../../_components';
import { tProps } from './_types';
import { OrganizationHeader, OrganizationTabs } from './_components';

export const OrganizationShellComponent = memo((props: tProps) => (
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
    <footer className="bgBlue white pT5 pB5">
      <div className="contain">
        @copyright etc
      </div>
    </footer>
  </>
));
