import cx from 'classnames';
import dayJS from 'dayjs';
import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Description, Events, ExternalLink, PlaceholderImage, RSVP} from '../../../../components';
import {tComponentProps} from './_types';

const MobileEventPage = memo((props: tComponentProps) => {
  const {event, eventsByOrgId, org} = props;
  const isPastMeeting = dayJS(event.date).isBefore(dayJS());

  return (
    <>
      {isPastMeeting && (
        <b className="block p-2 mb-3 rounded text-center bg-red-1 text-sm">
          This meeting already happened
        </b>
      )}
      {!isPastMeeting && (
        <RSVP event={event} />
      )}
      <h1 className="mt-5 d:mt-0 capitalize block d:hidden text-2 font-normal">
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
            className="font-bold leading-none text-gray-5"
            dateTime={dayJS(event.date).format('YYYY-MM-DDThh:mm:ssTZD')}>
            <div className="flex items-center mb-2">
              <span className="rounded-circ p-1 bg-gray-3 mr-2" />
              {dayJS(event.date).format('dddd, MMM DD')}
            </div>
            <div className="flex items-center mb-2">
              <span className="rounded-circ p-1 bg-gray-3 mr-2" />
              {dayJS(event.date).format('h:mm')}-{dayJS(event.endDate).format('h:mmA')}
            </div>
          </time>
          <div
            className={cx({
              'font-bold flex items-center text-gray-5 mb-2': true,
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
            <div className="flex items-center mb-3">
              <span className="rounded-circ p-1 bg-gray-3 mr-2" />
              {event.attendees.length} Going
            </div>
          )}
          {event.description && (
            <>
              <h2 className="text-3">
                Meeting Description
              </h2>
              <Description
                description={event.description}
              />
            </>
          )}
        </div>
      </div>
      {eventsByOrgId && eventsByOrgId.length > 0 && (
        <aside className="mb-4">
          <h2 className="text-3 mb-2 leading-none">
            More Upcoming Events
          </h2>
          <Events
            horizontal
            showOrgName
            events={eventsByOrgId}
          />
        </aside>
      )}
    </>
  );
});

export default MobileEventPage;
