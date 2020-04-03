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
        <div className="p-3 mb-3 text-center bg-green-1 font-bold text-sm">
          You&apos;re going to this meeting!
        </div>
      )}
      {isPastMeeting && (
        <div className="w-full p-3 mb-3 text-center bg-yellow-2 font-bold text-sm">
          This meeting has already happened
        </div>
      )}
      <div className="contain mt-4">
        <div className="mb-4">
          <Link to={`/org/${org.id}`} className="no-underline text-bold leading-none">
            {org.name}
          </Link>
        </div>
        <div className="flex flex-col d:flex-row  mb-5 pb-2">
          <div className="min-w-1/3 d:mr-4 mb-4 d:mb-0">
            <PlaceholderImage
              height={420}
              seed={event.id}
              width={640}
            />
          </div>
          <div>
            <time className="text-bold leading-none mb-3" dateTime={event.date}>
              {dayJS(event.date).format('ddd MMM DD YYYY, h:mmA')}
            </time>
            <h1 className="mb-3 capitalize">
              {event.title}
            </h1>
            {!isPastMeeting
              && (
                <div className="mb-3">
                  <RSVP event={event} />
                </div>
              )}
            <div className="text-bold mb-3">
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
          <aside className="w-full mB5">
            <h2 className="fs3 mb-3 leading-none">
            More events by {org.name}
            </h2>
            <Events
              horizontal
              events={eventsByOrgId}
            />
          </aside>
        )}
        {/* {eventsByOrgId && eventsByOrgId.length > 0 && (
        <aside className=" w-full mB5">
          <h2 className="fs3 mb-3 leading-none">
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
