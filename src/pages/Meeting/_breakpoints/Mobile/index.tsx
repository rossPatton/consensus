import cx from 'classnames';
import dayJS from 'dayjs';
import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {
  Description,
  ExternalLink,
  MeetingFeaturedImage,
  Meetings,
  RSVP,
} from '~app/components';

import {tComponentProps} from '../../_types';

const MobileMeetingPage = memo((props: tComponentProps) => {
  const {meeting, meetingsByGroupId, group} = props;
  const isPastMeeting = dayJS(meeting.date).isBefore(dayJS());

  return (
    <>
      {meeting.isDraft && (
        <div className="fadeInUp w-full p-2 mb-3 text-center bg-yellow-2 font-bold text-sm">
          This is a draft preview for your meeting.
        </div>
      )}
      {!meeting.isDraft && isPastMeeting && (
        <b className="fadeInUp block p-2 mb-3 rounded text-center bg-red-1 text-sm">
          This meeting has already happened
        </b>
      )}
      {!meeting.isDraft && !isPastMeeting && (
        <RSVP meeting={meeting} />
      )}
      <h1
        className={cx({
          'd:mt-0 capitalize block d:hidden text-2 font-normal': true,
          'mt-5 pt-3 ': !meeting.isDraft && !isPastMeeting,
        })}>
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
          <MeetingFeaturedImage
            img={meeting.img}
            seed={meeting.id}
          />
        </div>
        <div className="flex flex-col mb-3">
          <time
            className="font-bold leading-none text-gray-5"
            dateTime={dayJS(meeting.date).format('YYYY-MM-DDThh:mm:ssTZD')}>
            <div className="flex items-center mb-2">
              <img
                alt=""
                height="22"
                className="mr-1"
                src="/images/calendar.svg"
                width="16"
              />
              {dayJS(meeting.date).format('dddd, MMM DD')}
            </div>
            <div className="flex items-center mb-2">
              <img
                alt=""
                height="22"
                className="mr-1"
                src="/images/clock.svg"
                width="16"
              />
              {dayJS(meeting.date).format('h:mm')}-{dayJS(meeting.endDate).format('h:mmA')}
            </div>
          </time>
          {meeting.isOnline && (
            <div className="leading-none font-bold flex items-center mb-2 text-gray-5">
              <img
                alt=""
                height="10"
                className="mr-1"
                src="/images/online.svg"
                width="16"
              /> Online Meeting
            </div>
          )}
          {!meeting.isOnline && (
            <div className="leading-none font-bold flex items-center text-gray-5 mb-2">
              <img
                alt=""
                height="22"
                className="mr-1"
                src="/images/location.svg"
                width="16"
              />
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
          )}
          {meeting.attendees
            && meeting.attendees > 0 && (
            <div className="leading-none font-bold flex items-center">
              <img
                alt=""
                height="22"
                className="mr-1"
                src="/images/people.svg"
                width="16"
              />
              {meeting.attendees} Going
            </div>
          )}
        </div>
        {meeting.description && (
          <>
            <h2 className="text-3 font-semibold">
              Meeting Description
            </h2>
            <Description
              description={meeting.description}
            />
          </>
        )}
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

export default MobileMeetingPage;
