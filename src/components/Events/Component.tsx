import dayJS from 'dayjs';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { getRandomNum } from '../../utils';
import { ExternalLink } from '../../components';

export const EventsComponent = memo((props: { events: tEvent[] }) => (
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
            <Link to={`/events/${ev.id}`}>
              {ev.title}
            </Link>
          </h3>
          <div className="fx aiCtr mB2 fs6 fw600 lh1">
            <time className="mR1" dateTime={ev.date}>
              {dayJS(ev.date).format('MM/DD/YYYY h:mmA')}
            </time>
            <span className="mR1">@</span>
            {ev.locationLink && (
              <ExternalLink
                noFollow
                className="mR1"
                to={ev.locationLink}>
                {ev.location}
              </ExternalLink>
            )}
            {!ev.locationLink && ev.location}
          </div>
          <p className="mB2 pR5 lineClamp">
            {ev.description}
          </p>
          <div className="fx aiCtr fs6 lh1 lsNone black">
            {ev.goingCount > 0 && (
              <span className="mR3">
                {ev.goingCount} Attendees
              </span>
            )}
            {!ev.status && (
              <span className="br8 brdA1 p1 pL2 pR2 curPtr hvrBgGrey1 trans1 mR2">
                <span
                  role="img"
                  className="mR1"
                  aria-label="Big Plus Sign Emoji">
                  ➕
                </span>
                RSVP
              </span>
            )}
            {ev.status && (
              <>
                {ev.status.isGoing && (
                  <span
                    title="Click to cancel your RSVP"
                    className="br8 brdA1 p1 pL2 pR2 curPtr hvrBgGrey1 trans1 mR2">
                    <span
                      role="img"
                      className="mR1"
                      aria-label="Thumbs Up Emoji">
                      👍
                    </span>
                    You&apos;re going!
                  </span>
                )}
                {ev.status.didAttend && (
                  <span className="mR2">
                    <span
                      role="img"
                      className="mR1"
                      aria-label="Party Popper Emoji">
                      🎉
                    </span>
                    You went!
                  </span>
                )}
              </>
            )}
            {ev.isPrivate && (
              <small className="bgYellowLite br4 p1 pL2 pR2">
                <span
                  role="img"
                  className="mR1"
                  aria-label="Lock Emoji">
                  🔒
                </span>
                Private Event
              </small>
            )}
            {!ev.isPrivate && (
              <small className="bgGreenLite br4 p1 pL2 pR2">
                <span
                  role="img"
                  className="mR1"
                  aria-label="Tada Emoji">
                  🎉
                </span>
                Public Event
              </small>
            )}
          </div>
        </div>
      </li>
    ))}
  </ul>
));
