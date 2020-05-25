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

const DesktopMeetingComponent = memo((props: tComponentProps) => {
  const {meeting, meetingsByGroupId, group, rsvp = {} as ts.rsvp} = props;
  const isPastMeeting = dayJS(meeting.date).isBefore(dayJS());

  return (
    <>
      {meeting.isDraft && (
        <div className="fadeInUp rounded w-full p-1 mb-2 text-center bg-yellow-2 font-bold text-sm">
          This is a draft preview for your meeting.
        </div>
      )}
      {!meeting.isDraft && (
        <>
          {!isPastMeeting && rsvp.value === 'yes' && (
            <b className="fadeInUp block p-2 mb-3 rounded text-center bg-green-1 text-sm">
              You&apos;re going to this meeting!
            </b>
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
        <div className="min-w-1/3 mr-3">
          <MeetingFeaturedImage
            img={meeting.img}
            seed={meeting.id}
          />
        </div>
        <div className="min-w-2/3">
          <time
            className="flex items-center text-red-3 leading-none mb-1"
            dateTime={dayJS(meeting.date).format('YYYY-MM-DDThh:mm:ssTZD')}>
            <img
              alt=""
              height="22"
              className="mr-1"
              src="/images/calendar.svg"
              width="16"
            />
            {dayJS(meeting.date).format(`dddd, MMM DD ${isPastMeeting ? 'YYYY' : ''}`)} | {dayJS(meeting.date).format('h:mm')}-{dayJS(meeting.endDate).format('h:mmA')}
          </time>
          <h1 className="mb-1 capitalize">
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
            {meeting.isOnline && (
              <li className="flex items-center mb-1 text-gray-5">
                <img
                  alt=""
                  height="10"
                  className="mr-1"
                  src="/images/online.svg"
                  width="16"
                /> Online Meeting
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
          <Meetings
            horizontal
            meetings={meetingsByGroupId}
          />
        </aside>
      )}
    </>
  );
});

export default DesktopMeetingComponent;
