import React, { memo } from 'react';

import {PlanMeeting as PlanMeetingComponent} from '~app/components';

import {tProps} from './_types';

const PlanMeeting = memo((props: tProps) => (
  <div className="bg-white rounded p-2">
    <PlanMeetingComponent
      group={props.group}
      router={props.router}
      heading="Plan Meeting"
    />
  </div>
));

export default PlanMeeting;
