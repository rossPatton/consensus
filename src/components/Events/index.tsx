import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { getRandomNum } from '../../utils';
import { tProps } from './_types';

export const Events = memo((props: tProps) => (
  <ul>
    {props.events.map((ev, i) => (
      <li key={i} className="brdA1 br8 mB2 p3 fx aiCtr">
        <div className="br8 bgGrey1 mR3 col fxNoShrink">
          <img
            alt=""
            height="175"
            width="175"
            src={`https://picsum.photos/id/${getRandomNum(0, 100)}/175/175`}
          />
        </div>
        <div className="col">
          <h3 className="mB2 fx aiCtr ttCap">
            <Link
              to=""
              title="You RSVPed and then attended this event">
              {ev.title}
            </Link>
          </h3>
          <div className="fx aiCtr mB2 fs6 fw600 lh1">
            <time className="mR1" dateTime="2018-07-07T20:00:00">
              {ev.date}
            </time>
            <span className="mR1">@</span>
            <a href="filler" className="mR1">
              {ev.location}
            </a>
          </div>
          <p className="mB2 lineClamp">
            {ev.description}
          </p>
          <div className="fx fw600 fs6 lh1 lsNone black">
            {ev.goingCount > 0 && (
              <span className="mR2 fx aiCtr">
                <a href="filler">
                  {ev.goingCount} Attendees
                </a>
              </span>
            )}
            <span className="br8 brdA1 p1 pL2 pR2 mR2 fx aiCtr curPtr hvrBgGrey1 trans1">
              + RSVP to this event
            </span>
          </div>
        </div>
      </li>
    ))}
  </ul>
));
