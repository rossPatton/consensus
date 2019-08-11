import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Decisions, Events } from '../../../../components';
import { tComponentProps } from './_types';

export const OverviewComponent = memo((props: tComponentProps) => (
  <>
    <div className="mB4">
      <h2 className="mB2">Mission Statement</h2>
      <p>{props.org.description}</p>
    </div>
    <div className="mB4">
      <h2 className="mB2">Upcoming Events</h2>
      <Events events={props.events} />
      <Link to="/events" className="fs6 fw600 mB3">
        See All Events
      </Link>
    </div>
    <div>
      <h2 className="mB2">Public Decisions</h2>
      <Decisions decisions={props.decisions.slice(0, 3)} />
      <Link to="/decisions" className="fs6 fw600">
        See All Decisions
      </Link>
    </div>
  </>
));
