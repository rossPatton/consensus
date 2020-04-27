import cx from 'classnames';
import dayJS from 'dayjs';
import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Description, ExternalLink, Meetings, PlaceholderImage, RSVP} from '~app/components';

import {tComponentProps} from '../../_types';

const DesktopEventComponent = memo((props: tComponentProps) => {
  const {meeting, meetingsByGroupId, group, rsvp = {} as ts.rsvp} = props;
  const isPastMeeting = dayJS(meeting.date).isBefore(dayJS());

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
        to={`/group/${group.handle}`}
        className="inline-block no-underline leading-none mb-2 text-blue-1">
        {group.name}
      </Link>
      <div className="flex flex-row mb-4">
        <div className="min-w-1/3 mr-3">
          <PlaceholderImage
            height={420}
            seed={meeting.id}
            width={640}
          />
        </div>
        <div>
          <time
            className="text-yellow-3 leading-none mb-1"
            dateTime={dayJS(meeting.date).format('YYYY-MM-DDThh:mm:ssTZD')}>
            {dayJS(meeting.date).format(`dddd, MMM DD ${isPastMeeting ? 'YYYY' : ''}`)} | {dayJS(meeting.date).format('h:mm')}-{dayJS(meeting.endDate).format('h:mmA')}
          </time>
          <h1 className="mb-1 capitalize">
            {meeting.title}
          </h1>
          <h2 className="text-base capitalize mb-2">
            Hosted by <span className="text-blue-1">{meeting.groupName}</span>
          </h2>
          {!isPastMeeting && (
            <RSVP className="mb-3" meeting={meeting} />
          )}
          <div
            className={cx({
              'font-bold flex items-center text-gray-5': true,
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
            <div className="font-bold flex items-center mb-3 text-gray-5">
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
      {/* {meetingsByGroupId && meetingsByGroupId.length > 0 && (
        <aside className=" w-full mb-4">
          <h2 className="text-3 mb-2 leading-none">
            More {group.category} meetings in {group.city}
          </h2>
          <Meetings
            horizontal
            meetings={[...meetingsByGroupId.reverse()]}
          />
        </aside>
      )} */}
    </>
  );
});

export default DesktopEventComponent;
