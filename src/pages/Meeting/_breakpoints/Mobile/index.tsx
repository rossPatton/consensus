import cx from 'classnames';
import dayJS from 'dayjs';
import _ from 'lodash';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import {
  AddToCalendar,
  Description,
  ExternalLink,
  MeetingFeaturedImage,
  Meetings,
  RSVP,
  Share,
} from '~app/components';
import { slugify } from '~app/utils';

import { tComponentProps } from '../../_types';

const MobileMeetingPage = memo((props: tComponentProps) => {
  const { meeting, meetingsByGroupId, group, role, rsvp = {} as ts.rsvp } = props;
  const isPastMeeting = dayJS(meeting.date).isBefore(dayJS());
  const isUpcomingMeeting = !meeting.isDraft && !isPastMeeting;

  // maybe we should just like, include the duration in the DB?
  // instead of re-constructing here
  const startDate = dayJS(meeting.date);
  const endDate = dayJS(meeting.endDate);
  const duration = `${endDate.diff(startDate, 'hour')}`;

  const isAdmin = (role === 'admin' || role === 'facilitator');
  const hasRSVPed = (rsvp && rsvp.value === 'yes');

  // if meeting is online and the user has RSVP'd, then show the zoom/etc link
  // also used to conditionally adjust margins, since this pushes content down a bit
  let hasOnlineLink = meeting.isOnline && !!meeting.locationLink;
  if (hasRSVPed || role === 'admin') {
    hasOnlineLink = true;
  }

  const renderUpcomingLink = isUpcomingMeeting && hasOnlineLink;
  const renderGreenBox = isAdmin || renderUpcomingLink || hasRSVPed;

  return (
    <>
      {meeting.isDraft && (
        <div className="fadeInUp w-full p-2 mb-3 text-center bg-yellow-2 font-bold text-sm">
          This is a draft preview of your meeting.
        </div>
      )}
      {!meeting.isDraft && isPastMeeting && (
        <b className="fadeInUp block p-2 mb-3 rounded text-center bg-red-1 text-sm">
          This meeting has already happened
        </b>
      )}
      <RSVP meeting={meeting} />
      {renderGreenBox && (
        <div className={cx({
          'mt-5': role !== 'admin',
          'p-2 rounded text-center bg-green-1 text-sm': true,
        })}>
          {(role === 'admin' || role === 'facilitator') && (
            <Link
              className={cx({
                'block font-bold': true,
                'mb-1': renderUpcomingLink,
              })}
              to={`/group/${slugify(meeting.groupName)}/planMeeting?id=${meeting.id}`}>
              Edit this meeting
            </Link>
          )}
          {renderUpcomingLink && (
            <>
              Your Meeting Link: <ExternalLink
                noFollow
                to={meeting.locationLink}>
                {meeting.locationLink}
              </ExternalLink>
            </>
          )}
        </div>
      )}
      <h1
        className={cx({
          'd:mt-0 capitalize block d:hidden text-2 font-normal': true,
          'pt-3 ': isUpcomingMeeting,
          'mt-5': !renderGreenBox,
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
        <div className="min-w-4/12 d:mr-3">
          <MeetingFeaturedImage
            className="mb-1"
            img={meeting.img}
            seed={meeting.id}
          />
        </div>
        {!isPastMeeting && (
          <div className="flex flex-row items-center">
            <AddToCalendar
              // @ts-ignore
              className="mr-1"
              event={{
                description: meeting.description,
                duration,
                endDatetime: endDate.format('YYYYMMDDTHHmmss'),
                location: meeting.isOnline ? undefined : meeting.location,
                startDatetime: startDate.format('YYYYMMDDTHHmmss'),
                title: meeting.title,
              }}
            />
            <Share />
          </div>
        )}
        <div className="flex flex-col mb-3">
          <time
            className="font-semibold leading-none text-gray-5"
            dateTime={dayJS(meeting.date).format('YYYY-MM-DDThh:mm:ssTZD')}>
            <div className="flex items-center mb-2">
              <img
                alt=""
                height="22"
                className="mr-1"
                src="/images/clock.svg"
                width="16"
              />
              <div className="mr-1">
                {dayJS(meeting.date).format('dddd, MMM DD')}
              </div>
              {dayJS(meeting.date).format('h:mm')}-{dayJS(meeting.endDate).format('h:mmA')}
            </div>
          </time>
          <div className="flex items-center mb-2 text-gray-5 font-semibold">
            <img
              alt=""
              height="14"
              className="mr-1"
              src="/images/tag.svg"
              width="14"
            /> {meeting.tag}
          </div>
          {meeting.isOnline && (
            <div className="leading-none font-semibold flex items-center mb-2 text-gray-5">
              <img
                alt=""
                height="10"
                className="mr-1"
                src="/images/online.svg"
                width="16"
              /> Online
            </div>
          )}
          {!meeting.isOnline && (
            <div className="leading-none font-semibold flex items-center text-gray-5 mb-2">
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
          {typeof meeting.attendees === 'number'
            && meeting.attendees > 0
            && (
              <div className="leading-none font-semibold flex items-center text-gray-5">
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
      {
        meetingsByGroupId && meetingsByGroupId.length > 0 && (
          <aside className="mb-4">
            <h2 className="text-3 mb-2 leading-none">
              More Upcoming Meetings
            </h2>
            <div className="p-2 bg-peach-1 rounded">
              <Meetings
                horizontal
                showGroupName
                meetings={meetingsByGroupId}
              />
            </div>
          </aside>
        )
      }
    </>
  );
});

export default MobileMeetingPage;
