import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { getRandomNum } from '../../utils';
import { tComponentProps } from './_types';

export const EventsComponent = memo((props: tComponentProps) => (
  <ul>
    {props.events.map((ev, i) => (
      <li key={i} className="brdA1 br8 mB3 p3 fx">
        <div className="br8 bgGrey1 mR3 col fxNoShrink fxg0">
          <img
            alt=""
            height="175"
            width="175"
            src={`https://picsum.photos/id/${getRandomNum(0, 100)}/175/175`}
          />
        </div>
        <div className="col">
          <h3 className="mB2 fx aiCtr ttCap">
            <Link to="">
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
          <p className="mB2 pR5 lineClamp">
            {ev.description}
          </p>
          <div className="fx aiCtr fs6 lh1 lsNone black">
            {ev.goingCount > 0 && (
              <span className="mR3 fx aiCtr">
                <a href="filler">
                  {ev.goingCount} Attendees
                </a>
              </span>
            )}
            {ev.goingCount === 0 && (
              <span className="mR3 fx aiCtr">
                No attendees yet – be the first to RSVP!
              </span>
            )}
            {!ev.status && (
              <span className="br8 brdA1 p1 pL2 pR2 curPtr hvrBgGrey1 trans1">
                <span
                  role="img"
                  className="mR1"
                  aria-label="Big Plus Sign Emoji">
                  ➕
                </span>
                RSVP to this event
              </span>
            )}
            {ev.status && (
              <>
                {ev.status.isGoing && (
                  <span
                    title="Click to cancel your RSVP"
                    className="br8 brdA1 p1 pL2 pR2 curPtr hvrBgGrey1 trans1">
                    <span
                      role="img"
                      className="mR1"
                      aria-label="Thumbs Up Emoji">
                      👍
                    </span>
                    You&apos;re going to this event!
                  </span>
                )}
                {ev.status.didAttend && (
                  <span>
                    <span
                      role="img"
                      className="mR1"
                      aria-label="Party Popper Emoji">
                      🎉
                    </span>
                    You went to this event!
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </li>
    ))}
  </ul>
));
