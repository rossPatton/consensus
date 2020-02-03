import cx from 'classnames';
import dayJS from 'dayjs';
import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {EventPrivacy, Events, ExternalLink, RSVP} from '../../components';
import {tComponentProps} from './_types';

export const EventComponent = memo((props: tComponentProps) => {
  const {event, eventsByOrgId, match, rsvps} = props;
  const rsvp = _.find(rsvps, rsvp => event.id === rsvp.eventId);

  return (
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
      </div>
      <div className="fx mB3">
        <div className="col row mR4">
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
              Public Attendees
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
          {eventsByOrgId && eventsByOrgId.length > 0 && (
            <>
              <h2 className="fs5 mB3 ffLab lh1">
                More by <Link to={`/org/${event.orgId}/overview`}>
                  {event.orgName}
                </Link>
              </h2>
              <Events
                tiny
                events={eventsByOrgId}
                match={match}
              />
            </>
          )}
        </aside>
      </div>
    </div>
  );
});
