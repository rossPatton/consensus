import cx from 'classnames';
import dayJS from 'dayjs';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {EventPrivacy, Events, ExternalLink, RSVP, RSVPS} from '../../components';
import {tProps} from './_types';

export const EventComponent = memo(({event, events, match}: tProps) => (
  <div className="contain mT4 mB5">
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
      <RSVP event={event} />
      <EventPrivacy isPrivate={event.isPrivate} />
      <RSVPS event={event} />
    </div>
    <div className="fx mB3">
      <div className="col row mR4">
        {/* <div className="bgGrey1 mB3">
          <img
            alt=""
            className="row"
            height="175"
            width="175"
            src="https://via.placeholder.com/760x428"
          />
        </div>
      */}
        <div className="mB3 pB3 brdB1">
          {event.description &&
            event.description.split('\n').map((p: string, i) => (
              <p key={i} className="fs3">
                {p}
              </p>
            ))}
        </div>
        {event.attendees && event.attendees.length > 0 && (
          <>
            <div className="fs3 fw600 mB3">
              Who&lsquo;s going?
            </div>
            <ul className="fx">
              {event.attendees.map((user, i) => (
                <li
                  key={user.id}
                  className={cx({
                    'br8 brdA1 p3 mR2': true,
                    'mL2': i > 0,
                  })}>
                  <h4>
                    {user.name || user.username}
                  </h4>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <aside className="col row mT2">
        {events && events.length > 0 && (
          <>
            <h2 className="fs5 mB3 ffLab lh1">
              More by <Link to={`/org/${event.orgId}/overview`}>{event.orgName}</Link>
            </h2>
            <Events
              tiny
              events={events}
              match={match}
            />
          </>
        )}
      </aside>
    </div>
  </div>
));
