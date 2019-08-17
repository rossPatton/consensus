import dayJS from 'dayjs';
import React, { memo } from 'react';
import { Events, ExternalLink } from '../../components';
import { tComponentProps } from './_types';

export const EventComponent = memo(({ event, events }: tComponentProps) => (
  <div className="contain pT5 mT4 mB5">
    <small className="fx fw600 lh1 mB3">
      <time className="mR1" dateTime={event.date}>
        {dayJS(event.date).format('ddd MMM DD, h:mmA')}
      </time>
      <span className="mR1">@</span>
      {event.locationLink && (
        <ExternalLink
          noFollow
          className="mR1"
          to={event.locationLink}>
          {event.location}
        </ExternalLink>
      )}
      {!event.locationLink && event.location}
    </small>
    <h1 className="mB3 pB3 brdB1 ttCap">
      {event.title}
    </h1>
    <div className="fx aiCtr fs6 fw600 lh1 mB3">
      {event.goingCount > 0 && (
        <span className="mR2">
          {event.goingCount} attendees |
        </span>
      )}
      {!event.status && (
        <span className="br8 brdA1 p2 pL3 pR3 curPtr hvrBgGrey1 trans1 mR2">
          <span
            role="img"
            className="mR1"
            aria-label="Big Plus Sign Emoji">
            ➕
          </span>
          RSVP
        </span>
      )}
      {event.status && (
        <>
          {event.status.isGoing && (
            <span
              title="Click to cancel your RSVP"
              className="br8 brdA1 p2 pL3 pR3 curPtr hvrBgGrey1 trans1 mR2">
              <span
                role="img"
                className="mR1"
                aria-label="Thumbs Up Emoji">
                👍
              </span>
              You&apos;re going!
            </span>
          )}
          {event.status.didAttend && (
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
      {event.isPrivate && (
        <small className="bgYellowLite br4 p2 pL3 pR3">
          <span
            role="img"
            className="mR1"
            aria-label="Lock Emoji">
            🔒
          </span>
          Private Event
        </small>
      )}
      {!event.isPrivate && (
        <small className="bgGreenLite br4 p2 pL3 pR3">
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
    <div className="fx mB3">
      <div className="col row mR3">
        <div className="bgGrey1 mB3">
          <img
            alt=""
            className="row"
            height="175"
            width="175"
            src="https://via.placeholder.com/760x428"
          />
        </div>
        <p>
          {event.description}
        </p>
      </div>
      <aside>
        {events && events.length > 0 && (
          <>
            <h2 className="fs5 mB3 ffLab lh1">
            More by {event.orgName}
            </h2>
            <Events events={events} tiny />
          </>
        )}
      </aside>
    </div>
  </div>
));
