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
        <b className="block p-2 mb-2 rounded text-center bg-green-1 text-sm">
          You&apos;re going to this meeting!
        </b>
      )}
      {isPastMeeting && (
        <b className="block p-2 mb-2 rounded text-center bg-red-1 text-sm">
          This meeting has already happened
        </b>
      )}
      <div className="mb-1 d:mb-3">
        <Link to={`/org/${org.handle}`} className="no-underline font-bold leading-none">
          {org.name}
        </Link>
      </div>
      <div className="flex flex-col d:flex-row mb-4">
        <div className="min-w-1/3 d:mr-3 mb-2 d:mb-0">
          <PlaceholderImage
            height={420}
            seed={event.id}
            width={640}
          />
        </div>
        <div>
          <time
            className="font-bold leading-none mb-1 d:mb-2 text-gray-5"
            dateTime={event.date}>
            {dayJS(event.date).format('ddd MMM DD YYYY, h:mmA')}
          </time>
          <h1 className="mb-2 capitalize">
            {event.title}
          </h1>
          {!isPastMeeting
              && (
                <div className="mb-2">
                  <RSVP event={event} />
                </div>
              )}
          <div className="font-bold mb-2">
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
            {event.attendees
                && event.attendees.length > 0
                && (
                  `${event.attendees.length} ${pluralize('attendee', event.attendees.length)}`
                )}
          </div>
          {event.description && (
            <>
              {event.description.split('\n').map((p, i) => (
                <p
                  key={i}
                  className="mb-1 d:text-3">
                  {p}
                </p>
              ))}
            </>
          )}
        </div>
      </div>
      {eventsByOrgId && eventsByOrgId.length > 0 && (
        <aside className="w-full mb-4">
          <h2 className="text-3 mb-2 leading-none">
            More events by {org.name}
          </h2>
          <Events
            horizontal
            events={eventsByOrgId}
          />
        </aside>
      )}
      {/* {eventsByOrgId && eventsByOrgId.length > 0 && (
        <aside className=" w-full mb-4">
          <h2 className="text-3 mb-2 leading-none">
            More {org.category} events in {org.city}
          </h2>
          <Events
            horizontal
            events={[...eventsByOrgId.reverse()]}
          />
        </aside>
      )} */}
    </>
  );
});
