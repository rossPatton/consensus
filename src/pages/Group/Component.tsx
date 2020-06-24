import React, {memo} from 'react';

import {PlanMeeting} from '~app/components';

import {GroupInfo, GroupTabs} from './_components';
import {Meetings, Members} from './_subpages';
import {tComponentProps} from './_types';

export const GroupComponent = memo((props: tComponentProps) => (
  <div className="flex flex-col d:flex-row items-start">
    <GroupInfo
      match={props.match}
      group={props.group}
      params={props.match.params}
      role={props.role}
    />
    <div className="d:border d:shadow rounded d:min-w-8/12">
      <GroupTabs
        match={props.match}
        role={props.role}
      />
      {typeof props.match.params.section === 'undefined' && (
        <Meetings
          match={props.match}
          group={props.group}
          role={props.role}
          session={props.session}
        />
      )}
      {props.match.params.section === 'drafts' && (
        <Meetings
          match={props.match}
          group={props.group}
          role={props.role}
          session={props.session}
        />
      )}
      {props.match.params.section === 'members' && (
        <Members
          match={props.match}
          group={props.group}
          role={props.role}
        />
      )}
      {props.match.params.section === 'pending' && (
        <Members
          match={props.match}
          group={props.group}
          role={props.role}
        />
      )}
      {props.match.params.section === 'planMeeting' && (
        <PlanMeeting
          group={props.group}
          router={props.location}
        />
      )}
    </div>
  </div>
));
