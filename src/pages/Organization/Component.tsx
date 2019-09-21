import cx from 'classnames';
import React from 'react';

import {UserBar} from './_components';
import {OrganizationHeader, OrganizationTabs} from './_components';
import {AdminEvent, AdminManage, Decisions, Events, Overview} from './_subpages';
import {tComponentProps} from './_types';

export const OrganizationComponent = (props: tComponentProps) => (
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
      role={props.role}
      session={props.session}
    />
    <div
      className={cx({
        'contain mB4': true,
        mT4: !props.session.isAuthenticated,
      })}>
      {props.match.params.section === 'overview' && (
        <Overview
          org={props.org}
          role={props.role}
        />
      )}
      {props.match.params.section === 'decisions' && (
        <Decisions
          match={props.match}
          org={props.org}
          role={props.role}
        />
      )}
      {props.match.params.section === 'events' && (
        <Events
          match={props.match}
          org={props.org}
          role={props.role}
        />
      )}
      {props.match.params.section === 'createEvent' && (
        <AdminEvent
          org={props.org}
          router={props.location}
        />
      )}
      {(props.match.params.section === 'manageDecisions'
        || props.match.params.section === 'manageEvents'
        || props.match.params.section === 'manageOrganization'
        || props.match.params.section === 'manageMembers') && (
        <AdminManage
          match={props.match}
          org={props.org}
          role={props.role}
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
