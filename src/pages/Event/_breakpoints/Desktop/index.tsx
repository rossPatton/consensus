import cx from 'classnames';
import dayJS from 'dayjs';
import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Events, ExternalLink, PlaceholderImage, RSVP} from '../../../../components';
import {tComponentProps} from './_types';

const DesktopEventComponent = memo((props: tComponentProps) => {
  const {event, eventsByOrgId, org, rsvp = {} as tRSVP} = props;
  const isPastMeeting = dayJS(event.date).isBefore(dayJS());

  return (
    <>
      {!isPastMeeting && rsvp.value === 'yes' && (
        <b className="block p-2 mb-3 rounded text-center bg-green-1 text-sm">
          You&apos;re going to this meeting!
        </b>
      )}
      {isPastMeeting && (
        <b className="block p-2 mb-3 rounded text-center bg-red-1 text-sm">
          This meeting has already happened
        </b>
      )}
      <Link
        to={`/org/${org.handle}`}
        className="inline-block no-underline leading-none mb-2 text-blue-1">
        {org.name}
      </Link>
      <div className="flex flex-row mb-4">
        <div className="min-w-1/3 mr-3">
          <PlaceholderImage
            height={420}
            seed={event.id}
            width={640}
          />
        </div>
        <div>
          <time
            className="text-yellow-3 leading-none mb-1"
            dateTime={dayJS(event.date).format('YYYY-MM-DDThh:mm:ssTZD')}>
            {dayJS(event.date).format(`dddd, MMM DD ${isPastMeeting ? 'YYYY' : ''}`)} | {dayJS(event.date).format('h:mm')}-{dayJS(event.endDate).format('h:mmA')}
          </time>
          <h1 className="mb-1 capitalize">
            {event.title}
          </h1>
          <h2 className="text-base capitalize mb-2">
            Hosted by <span className="text-blue-1">{event.orgName}</span>
          </h2>
          {!isPastMeeting && (
            <RSVP className="mb-3" event={event} />
          )}
          <div
            className={cx({
              'font-bold flex items-center text-gray-5': true,
              'mb-3': !event.attendees || event.attendees.length === 0,
            })}>
            <span className="rounded-circ p-1 bg-gray-3 mr-2" />
            {event.locationLink && (
              <ExternalLink
                noFollow
                className="no-underline"
                to={event.locationLink}>
                {event.location}
              </ExternalLink>
            )}
            {!event.locationLink && event.location}
          </div>
          {event.attendees
            && event.attendees.length > 0 && (
            <div className="font-bold flex items-center mb-3 text-gray-5">
              <span className="rounded-circ p-1 bg-gray-3 mr-2" />
              {event.attendees.length} Going
            </div>
          )}
          {event.description && (
            <>
              <h2 className="text-3">
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

export default DesktopEventComponent;
