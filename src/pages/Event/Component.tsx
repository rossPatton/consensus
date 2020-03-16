import dayJS from 'dayjs';
import _ from 'lodash';
import pluralize from 'pluralize';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Events, ExternalLink, PlaceholderImage, RSVP} from '../../components';
import {tComponentProps} from './_types';

export const EventComponent = memo((props: tComponentProps) => {
  const {event, eventsByOrgId, org, rsvp = {} as tRSVP} = props;
  const isPastMeeting = dayJS(event.date).isBefore(dayJS());

  return (
    <>
      {!isPastMeeting && rsvp.value === 'yes' && (
        <div className="row p3 mB3 taCtr bgGreenLite fw600 fs6">
          You&apos;re going to this meeting!
        </div>
      )}
      {isPastMeeting && (
        <div className="row p3 mB3 taCtr bgYellow fw600 fs6">
          This meeting has already happened
        </div>
      )}
      <div className="contain mT4">
        <div className="mB4">
          <Link to={`/org/${org.id}`} className="noUnderline fw600 lh1">
            {org.name}
          </Link>
        </div>
        <div className="fx mB5 pB2">
          <div className="mR3">
            <PlaceholderImage
              height={420}
              seed={event.id}
              width={640}
            />
          </div>
          <div className="row rel">
            <time className="fw600 lh1 mB3" dateTime={event.date}>
              {dayJS(event.date).format('ddd MMM DD YYYY, h:mmA')}
            </time>
            <h1 className="fs2 mB3 ttCap">
              {event.title}
            </h1>
            {!isPastMeeting
              && (
                <div className="mB3">
                  <RSVP event={event} />
                </div>
              )}
            <div className="fw600 mB3">
              <div>
                {event.locationLink && (
                  <ExternalLink
                    noFollow
                    to={event.locationLink}>
                    {event.location}
                  </ExternalLink>
                )}
                {!event.locationLink && event.location}
              </div>
              {event.attendees.length > 0 && (
                `${event.attendees.length} ${pluralize('attendee', event.attendees.length)}`
              )}
            </div>
            {event.description && (
              <div className="fs5">
                {event.description.split('\n').map((p: string, i) => (
                  <p key={i} className="fs3">
                    {p}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
        {eventsByOrgId && eventsByOrgId.length > 0 && (
          <aside className="col row mB5">
            <h2 className="fs3 mB3 lh1">
            More events by {org.name}
            </h2>
            <Events
              horizontal
              events={eventsByOrgId}
            />
          </aside>
        )}
        {/* {eventsByOrgId && eventsByOrgId.length > 0 && (
        <aside className="col row mB5">
          <h2 className="fs3 mB3 lh1">
            More {org.category} events in {org.city}
          </h2>
          <Events
            horizontal
            events={[...eventsByOrgId.reverse()]}
          />
        </aside>
      )} */}
      </div>
    </>
  );
});
