import React, { memo } from 'react';

import {Helmet, PlanMeeting as PlanMeetingComponent} from '../../../../../components';
import {tProps} from './_types';

const PlanMeeting = memo((props: tProps) => (
  <>
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
    <h1 className="fs3 mB3">
      Plan Meeting
    </h1>
    <PlanMeetingComponent
      org={props.org}
      router={props.router}
    />
  </>
));

export default PlanMeeting;