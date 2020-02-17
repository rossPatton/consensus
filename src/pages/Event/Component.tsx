import cx from 'classnames';
import dayJS from 'dayjs';
import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Events, ExternalLink, RSVP} from '../../components';
import {tComponentProps} from './_types';

export const EventComponent = memo((props: tComponentProps) => {
  const {event, eventsByOrgId, org} = props;

  return (
    <div className="contain mT4">
      <Link to={`org/${org.id}`} className="fw600 lh1 mB4">
        {org.name}
      </Link>
      <div className="fx mB5">
        <div
          className="bgWhite mR3 br8 brdA1"
          style={{
            height: '200px',
            minWidth: '400px',
          }}
        />
        <div className="row rel">
          <time className="fw600 lh1 mB3" dateTime={event.date}>
            {dayJS(event.date).format('ddd MMM DD, h:mmA')}
          </time>
          <h1 className="fs2 mB3 ttCap">
            {event.title}
          </h1>
          <div className="fx aiCtr fs6 fw600 lh1 mB3">
            <RSVP event={event} />
          </div>
          <div className="fw600 mB3">
            {event.locationLink && (
              <ExternalLink
                noFollow
                to={event.locationLink}>
                {event.location}
              </ExternalLink>
            )}
            {!event.locationLink && event.location}
          </div>
          <div className="fs5">
            {event.description && event.description.split('\n')[0]}
            {/* event.description.split('\n').map((p: string, i) => (
              <p key={i} className="fs3">
                {p}
              </p>
            ))} */}
          </div>
        </div>
      </div>
      {eventsByOrgId && eventsByOrgId.length > 0 && (
        <aside className="col row mT2">
          <h2 className="fs3 mB3 lh1">
            More upcoming events
          </h2>
          <Events
            horizontal
            events={eventsByOrgId}
          />
        </aside>
      )}
    </div>
  );
});
