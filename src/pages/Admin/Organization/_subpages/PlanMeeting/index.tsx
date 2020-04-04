import React, { memo } from 'react';

import {Helmet, PlanMeeting as PlanMeetingComponent} from '../../../../../components';
import {tProps} from './_types';

const PlanMeeting = memo((props: tProps) => (
  <div className="bg-white rounded p-2">
    <Helmet
      canonical=""
      title=""
      meta={[
        { name: 'description', content: '' },
        { name: 'keywords', content: '' },
        { property: 'og:title', content: '' },
        { property: 'og:description', content: '' },
      ]}
    />
    <h1 className="fs3 mb-2">
      Plan Meeting
    </h1>
    <PlanMeetingComponent
      org={props.org}
      router={props.router}
    />
  </div>
));

export default PlanMeeting;
