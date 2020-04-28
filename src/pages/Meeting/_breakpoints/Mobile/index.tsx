import cx from 'classnames';
import dayJS from 'dayjs';
import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Description, ExternalLink, Meetings, PlaceholderImage, RSVP} from '~app/components';

import {tComponentProps} from '../../_types';

const MobileEventPage = memo((props: tComponentProps) => {
  const {meeting, meetingsByGroupId, group} = props;
  const isPastMeeting = dayJS(meeting.date).isBefore(dayJS());

  return (
    <>
      {isPastMeeting && (
        <b className="block p-2 mb-3 rounded text-center bg-red-1 text-sm">
          This meeting already happened
        </b>
      )}
      {!isPastMeeting && (
        <RSVP meeting={meeting} />
      )}
      <h1 className="mt-5 d:mt-0 capitalize block d:hidden text-2 font-normal">
        {meeting.title}
      </h1>
      {group.name && (
        <Link
          to={`/group/${group.handle}`}
          className="inline-block no-underline leading-none mb-2 text-blue-1">
          {group.name}
        </Link>
      )}
      <div className="flex flex-col d:flex-row mb-4">
        <div className="min-w-1/3 d:mr-3 mb-2 d:mb-0">
          <PlaceholderImage
            height={420}
            seed={meeting.id}
            width={640}
          />
        </div>
        <div className="flex flex-col">
          <time
            className="font-bold leading-none text-gray-5"
            dateTime={dayJS(meeting.date).format('YYYY-MM-DDThh:mm:ssTZD')}>
            <div className="flex items-center mb-2">
              <span className="rounded-circ p-1 bg-gray-3 mr-2" />
              {dayJS(meeting.date).format('dddd, MMM DD')}
            </div>
            <div className="flex items-center mb-2">
              <span className="rounded-circ p-1 bg-gray-3 mr-2" />
              {dayJS(meeting.date).format('h:mm')}-{dayJS(meeting.endDate).format('h:mmA')}
            </div>
          </time>
          <div
            className={cx({
              'font-bold flex items-center text-gray-5 mb-2': true,
              'mb-3': !meeting.attendees || meeting.attendees.length === 0,
            })}>
            <span className="rounded-circ p-1 bg-gray-3 mr-2" />
            {meeting.locationLink && (
              <ExternalLink
                noFollow
                className="no-underline"
                to={meeting.locationLink}>
                {meeting.location}
              </ExternalLink>
            )}
            {!meeting.locationLink && meeting.location}
          </div>
          {meeting.attendees
            && meeting.attendees.length > 0 && (
            <div className="flex items-center mb-3">
              <span className="rounded-circ p-1 bg-gray-3 mr-2" />
              {meeting.attendees.length} Going
            </div>
          )}
          {meeting.description && (
            <>
              <h2 className="text-3">
                Meeting Description
              </h2>
              <Description
                description={meeting.description}
              />
            </>
          )}
        </div>
      </div>
      {meetingsByGroupId && meetingsByGroupId.length > 0 && (
        <aside className="mb-4">
          <h2 className="text-3 mb-2 leading-none">
            More Upcoming Meetings
          </h2>
          <Meetings
            horizontal
            showOrgName
            meetings={meetingsByGroupId}
          />
        </aside>
      )}
    </>
  );
});

export default MobileEventPage;
