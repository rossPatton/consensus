import cx from 'classnames';
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
    {props.events.length > 0 && (
      <div className={cx({mB5: props.decisions.length > 0})}>
        <h2 className="mB2">Upcoming Events</h2>
        <Events events={props.events} role={props.role} />
        <Link to="events" className="lh1 fs6 fw600">
          See All Events
        </Link>
      </div>
    )}
    {props.role && props.decisions.length > 0 && (
      <>
        <h2 className="mB2">Active Decisions</h2>
        <Decisions decisions={props.decisions.slice(0, 3)} />
        <Link to="decisions" className="lh1 fs6 fw600">
          See All Decisions
        </Link>
      </>
    )}
  </>
));
