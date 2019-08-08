import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { RSVPStatus } from '..';

export const Events = memo(({ events }: { events: tEvent[] }) => (
  <ul>
    {events.map((event, i) => (
      <li key={i} className="brdA1 br8 mB2 p3 fx aiCtr">
        <div className="bgGrey br8 p3 col p5 bgGrey1 mR3" />
        <div className="col">
          <h3 className="mB2 fx aiCtr ttCap">
            <RSVPStatus event={event} />
            <Link
              to=""
              title="You RSVPed and then attended this event">
              {event.title}
            </Link>
          </h3>
          <div className="fx aiCtr mB2 fs6 fw600 lh1">
            <time className="mR1" dateTime="2018-07-07T20:00:00">
              {event.date}
            </time>
            <span className="mR1">@</span>
            <a href="filler" className="mR1">
              {event.location}
            </a>
          </div>
          <p className="mB2 lineClamp">
            {event.description}
          </p>
          <div className="fx fw600 fs6 lh1 lsNone black">
            <span className="br4 brdA1 p1 pL2 pR2 mR2 fx aiCtr curPtr hvrBgGrey1 trans1">
              <span className="bgBlue circ p1 mR1" />
              {event.going} Going
            </span>
            <span className="bgr4 brdA1 p1 pL2 pR2 fx aiCtr curPtr hvrBgGrey1 trans1">
              <span className="bgYellow circ p1 mR1" />
              {event.interested} Interested
            </span>
          </div>
        </div>
      </li>
    ))}
  </ul>
));
