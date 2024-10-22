import React, {memo} from 'react';

import {Helmet, PlanMeeting as PlanMeetingComponent} from '~app/components';

import {tProps} from './_types';

const PlanMeeting = memo((props: tProps) => (
  <>
    <Helmet
      canonical={`/group/${props.group.handle}/planMeeting`}
      title=""
      meta={[
        { name: 'description', content: `Plan your next meeting with ${props.group.name}` },
        { name: 'keywords', content: 'plan,meeting' },
      ]}
    />
    <PlanMeetingComponent
      group={props.group}
      router={props.location}
    />
  </>
));

export default PlanMeeting;
