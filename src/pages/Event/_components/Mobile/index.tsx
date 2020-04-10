import dayJS from 'dayjs';
import _ from 'lodash';
import cx from 'classnames';
import pluralize from 'pluralize';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Events, ExternalLink, PlaceholderImage, RSVP} from '../../../../components';
import {tComponentProps} from './_types';

const MobileEventPage = memo((props: tComponentProps) => {
  const {event, eventsByOrgId, org, rsvp = {} as tRSVP} = props;
  const isPastMeeting = dayJS(event.date).isBefore(dayJS());
  console.log('mobile events');

  return (
    <>
      {!isPastMeeting && rsvp.value === 'yes' && (
        <b className="hidden d:block p-2 mb-3 rounded text-center bg-green-1 text-sm">
          You&apos;re going to this meeting!
        </b>
      )}
      {isPastMeeting && (
        <b className="block p-2 mb-3 rounded text-center bg-red-1 text-sm">
          This meeting has already happened
        </b>
      )}
      <h1 className="mt-4 d:mt-0 capitalize block d:hidden text-2 font-normal">
        {event.title}
      </h1>
      <Link
        to={`/org/${org.handle}`}
        className="inline-block no-underline leading-none mb-2 text-blue-1">
        {org.name}
      </Link>
      <div className="flex flex-col d:flex-row mb-4">
        <div className="min-w-1/3 d:mr-3 mb-2 d:mb-0">
          <PlaceholderImage
            height={420}
            seed={event.id}
            width={640}
          />
        </div>
        <div className="flex flex-col">
          <time
            className="font-bold flex items-center leading-none mb-2 text-gray-5"
            dateTime={event.date}>
            <span className='rounded-circ p-1 bg-gray-3 mr-2' />
            {dayJS(event.date).format('dddd, MMM DD')}
          </time>
          <time
            className="font-bold flex items-center leading-none mb-2 text-gray-5"
            dateTime={event.date}>
            {console.log(event)}
            <span className='rounded-circ p-1 bg-gray-3 mr-2' />
            {dayJS(event.date).format('h:mmA')}
          </time>
          <h1 className="mb-2 capitalize hidden d:block">
            {event.title}
          </h1>
          {!isPastMeeting && <RSVP event={event} />}
          <div
            className={cx({
              "font-bold flex items-center text-gray-5": true,
              'mb-3': !event.attendees || event.attendees.length === 0,
            })}>
            <span className='rounded-circ p-1 bg-gray-3 mr-2' />
            {event.locationLink && (
              <ExternalLink
                noFollow
                className='no-underline'
                to={event.locationLink}>
                {event.location}
              </ExternalLink>
            )}
            {!event.locationLink && event.location}
          </div>
          {event.attendees
            && event.attendees.length > 0 && (
            <div className="flex items-center mb-3">
              <span className='rounded-circ p-1 bg-gray-3 mr-2' />
              {event.attendees.length} {pluralize('attendee', event.attendees.length)}
            </div>
          )}
          {event.description && (
            <>
              <h2 className='text-3'>
                Meeting Description
              </h2>
              {event.description.split('\n').map((p, i) => (
                <p key={i} className="mb-1">
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

export default MobileEventPage;
