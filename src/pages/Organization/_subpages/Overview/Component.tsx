import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import { Events } from '../../../../components';
import { tComponentProps } from './_types';

export const OverviewComponent = memo((props: tComponentProps) => (
  <>
    <div className="mB4">
      <h2 className="mB2">Mission Statement</h2>
      {props.org.description.split('\n').map((p, i) => (
        <p key={i}>
          {p}
        </p>
      ))}
    </div>
    {props.events.length > 0 && (
      <>
        <h2 className="mB2">Upcoming Meetings</h2>
        <Events events={props.events} match={props.match} role={props.role} />
        <Link to="events" className="lh1 fs6 fw600">
          See All Meetings
        </Link>
      </>
    )}
  </>
));
