import dayJS from 'dayjs';
import pluralize from 'pluralize';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {EventPrivacy, Events, ExternalLink, RSVP} from '../../components';
import {tComponentProps} from './_types';

export const EventComponent = memo(({event, events}: tComponentProps) => (
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
      {event.attendees > 0 && (
        <span className="mR3">
          {event.attendees} {pluralize('attendees', event.attendees)}
        </span>
      )}
    </div>
    <div className="fx mB3">
      <div className="col row mR3">
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
        {event.description &&
          event.description.split('\n').map((p: string, i) => (
            <p key={i} className="fs3">
              {p}
            </p>
          ))}
      </div>
      <aside className="col row mT2">
        {events && events.length > 0 && (
          <>
            <h2 className="fs5 mB3 ffLab lh1">
            More by <Link to={`/org/${event.orgId}/overview`}>{event.orgName}</Link>
            </h2>
            <Events events={events} tiny />
          </>
        )}
      </aside>
    </div>
  </div>
));
