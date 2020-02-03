import cx from 'classnames';
import React from 'react';

import {OrganizationHeader, OrganizationTabs, UserBar} from './_components';
import {CreateOrEditEvent, Events, Members, Overview} from './_subpages';
import {tComponentProps} from './_types';

export const OrganizationComponent = (props: tComponentProps) => (
  <>
    <OrganizationHeader
      org={props.org}
      params={props.match.params}
    />
    <OrganizationTabs
      match={props.match}
      role={props.role}
    />
    <UserBar
      match={props.match}
      org={props.org}
      role={props.role}
      session={props.session}
    />
    <div
      className={cx({
        contain: true,
        mT4: !props.session.isAuthenticated,
      })}>
      {props.match.params.section === 'overview' && (
        <Overview
          match={props.match}
          org={props.org}
          role={props.role}
          session={props.session}
        />
      )}
      {props.match.params.section === 'events' && (
        <Events
          location={props.location}
          match={props.match}
          org={props.org}
          role={props.role}
          session={props.session}
        />
      )}
      {props.match.params.section === 'createEvent' && (
        <CreateOrEditEvent
          org={props.org}
          router={props.location}
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
    </div>
  </>
);
