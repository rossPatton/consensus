import cx from 'classnames';
import dayJS from 'dayjs';
import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {
  AddToCalendar,
  Description,
  ExternalLink,
  MeetingFeaturedImage,
  Meetings,
  RSVP,
  Share,
} from '~app/components';

import {tComponentProps} from '../../_types';

const DesktopMeetingComponent = memo((props: tComponentProps) => {
  const {meeting, meetingsByGroupId, group, role, rsvp = {} as ts.rsvp} = props;
  const isPastMeeting = dayJS(meeting.date).isBefore(dayJS());

  // maybe we should just like, include the duration in the DB?
  // instead of re-constructing here
  const startDate = dayJS(meeting.date);
  const endDate = dayJS(meeting.endDate);
  const duration = `${endDate.diff(startDate, 'hour')}`;

  return (
    <>
      {meeting.isDraft && (
        <div className="fadeInUp rounded w-full p-1 mb-2 text-center bg-yellow-2 font-bold text-sm">
          This is a draft preview for your meeting.
        </div>
      )}
      {!meeting.isDraft && (
        <>
          {!isPastMeeting
            && (rsvp.value === 'yes' || role === 'admin') && (
            <div className="fadeInUp p-2 mb-3 rounded text-center bg-green-1 text-sm">
              <b className="block mb-1">
                {role !== 'admin' && "You're going to this meeting!"}
                {role === 'admin' && "This is your group's meeting"}
              </b>
              {meeting.isOnline
                && meeting.locationLink
                && (
                  <ExternalLink
                    noFollow
                    className=""
                    to={meeting.locationLink}>
                    {meeting.locationLink}
                  </ExternalLink>
                )}
            </div>
          )}
          {isPastMeeting && (
            <b className="fadeInUp block p-2 mb-3 rounded text-center bg-red-1 text-sm">
              This meeting has already happened
            </b>
          )}
        </>
      )}
      {group.name && (
        <Link
          to={`/group/${group.handle}`}
          className="inline-block no-underline leading-none mb-2 text-blue-1 font-semibold">
          {group.name}
        </Link>
      )}
      <div className="flex flex-row mb-4">
        <div className="min-w-5/12 mr-3">
          <MeetingFeaturedImage
            className="mb-1"
            img={meeting.img}
            seed={meeting.id}
          />
          {!isPastMeeting && (
            <div className="flex items-center">
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
        </div>
        <div className="min-w-7/12">
          <time
            className="flex items-center text-red-3 leading-none mb-1"
            dateTime={dayJS(meeting.date).format('YYYY-MM-DDThh:mm:ssTZD')}>
            {dayJS(meeting.date).format(`dddd, MMM DD ${isPastMeeting ? 'YYYY' : ''}`)} | {dayJS(meeting.date).format('h:mm')}-{dayJS(meeting.endDate).format('h:mmA')}
          </time>
          <h1
            className={cx({
              'capitalize': true,
              'mb-1': meeting.host !== meeting.groupName,
              'mb-2': meeting.host === meeting.groupName,
            })}>
            {meeting.title}
          </h1>
          {meeting.host !== meeting.groupName && (
            <h2 className="text-base capitalize mb-2">
              Hosted by <span className="text-blue-1">{meeting.host}</span>
            </h2>
          )}
          {!meeting.isDraft
            && !isPastMeeting
            && (
              <RSVP className="mb-2" meeting={meeting} />
            )}
          <ul className="mb-2 font-semibold">
            <li className="flex items-center mb-1 text-gray-5">
              <img
                alt=""
                height="14"
                className="mr-1"
                src="/images/tag.svg"
                width="14"
              /> {meeting.tag}
            </li>
            {meeting.isOnline && (
              <li className="flex items-center mb-1 text-gray-5">
                <img
                  alt=""
                  height="10"
                  className="mr-1"
                  src="/images/online.svg"
                  width="16"
                /> Online {rsvp.value !== 'yes' && role !== 'admin' && '- RSVP for meeting link'}
              </li>
            )}
            {!meeting.isOnline
              && meeting.location
              && (
                <li className="font-semibold flex items-center text-gray-5 mb-1">
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
                </li>
              )}
            {!meeting.isDraft
              && meeting.attendees > 0 && (
              <li className="font-semibold flex items-center mb-3 text-gray-5">
                <img
                  alt=""
                  height="22"
                  className="mr-1"
                  src="/images/people.svg"
                  width="16"
                />
                {meeting.attendees} Going
              </li>
            )}
          </ul>
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
      </div>
      {meetingsByGroupId && meetingsByGroupId.length > 0 && (
        <aside className="w-full mb-4">
          <h2 className="text-3 mb-2 leading-none">
            More meetings by {group.name}
          </h2>
          <div className="p-2 bg-peach-1 rounded">
            <Meetings
              horizontal
              meetings={meetingsByGroupId}
            />
          </div>
        </aside>
      )}
    </>
  );
});

export default DesktopMeetingComponent;
