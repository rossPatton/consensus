import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import { Decisions, Events } from '../../../../components';
import { tProps } from './_types';

export const OverviewComponent = memo((props: tProps) => (
  <>
    <div className="contain ffLab pB4 pT3">
      <div className="mB4">
        <h2 className="mB2">Mission Statement</h2>
        {props.org.description}
      </div>
      <div className="mB4 pT2 mT2 brdT1 brdBlue brdW2">
        <h2 className="mB3">Upcoming Events</h2>
        <Events events={props.events} />
        <Link to="/events" className="fs6 fw600 mB1">
          See All Events
        </Link>
      </div>
      <div className="mB5 pT2 mT2 brdT1 brdBlue brdW2">
        <h2 className="mB3">Public Decisions</h2>
        <Decisions decisions={props.decisions.slice(0, 3)} />
        <Link to="/decisions" className="fs6 fw600 mB1">
          See All Decisions
        </Link>
      </div>
    </div>
    <footer className="bgBlue white pT5 pB5">
      <div className="contain">
        @copyright etc
      </div>
    </footer>
  </>
));
