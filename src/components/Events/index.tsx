import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { RSVPStatus } from '..';

export const Events = memo(({ events }: { events: tEvent[] }) => (
  <ul className="lsNone brdB1 mB2">
    {events.map((event, i) => (
      <li key={i} className="brdA1 brdB0 p3 m0">
        <h3 className="mB3 black fx aiCtr">
          <RSVPStatus event={event} />
          <Link
            to=""
            className="noUnderline"
            title="You RSVPed and then attended this event">
            {event.title}
          </Link>
        </h3>
        <div className="fx aiCtr mB3 fs6 fw600 black lh1">
          <time className="mR1" dateTime="2018-07-07T20:00:00">
            {event.date}
          </time>
          <span className="mR1">@</span>
          <a href="filler" className="mR1">
            {event.location}
          </a>
        </div>
        <p className="copyBlack ffLab mB2">
          {event.description}
        </p>
        <div className="fx fw600 fs6 lh1 lsNone black">
          <span className="br4 brdA1 p1 pL2 pR2 mR2 fx aiCtr curPtr hvrBgGrey1 trans1">
            <span className="bgGreen circ p2 mR1" />
            {event.going} Going
          </span>
          <span className="bgr4 brdA1 p1 pL2 pR2 fx aiCtr curPtr hvrBgGrey1 trans1">
            <span className="bgYellow circ p2 mR1" />
            {event.interested} Interested
          </span>
        </div>
      </li>
    ))}
  </ul>
));
