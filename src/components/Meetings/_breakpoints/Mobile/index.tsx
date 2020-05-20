import cx from 'classnames';
import dayJS from 'dayjs';
import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Emoji, MeetingFeaturedImage} from '~app/components';
import {objToQueryString, slugify} from '~app/utils';

import {tComponentProps} from './_types';

const MobileMeetings = memo((props: tComponentProps) => (
  <ul className="text-left">
    {props.meetings.map(meeting => {
      const isPastMeeting = dayJS(meeting.date).isBefore(dayJS());
      const {id, ...evWithoutId} = meeting;
      const qs = objToQueryString(meeting);
      const qsWithCopy = objToQueryString({...evWithoutId, isCopy: true});

      return (
        <li
          key={meeting.id}
          className="flex flex-row mb-2">
          {!meeting.isDraft && (
            <Link
              className={cx({
                'max-w-1/2': !props.isEditable,
                'max-w-1/3': props.isEditable,
              })}
              to={meeting.isDraft
                ? `/draft/${meeting.id}/${meeting.slug}`
                : `/meeting/${meeting.id}/${meeting.slug}}`}>
              <MeetingFeaturedImage
                img={meeting.img}
                seed={meeting.id}
              />
            </Link>
          )}
          {meeting.isDraft && (
            <div className="max-w-1/3">
              <MeetingFeaturedImage
                img={meeting.img}
                seed={meeting.id}
              />
            </div>
          )}
          <div className="pl-1">
            <div className="flex mb-1 text-sm text-red-3 leading-none">
              <time className="mr-1" dateTime={meeting.date}>
                {isPastMeeting
                  ? dayJS(meeting.date).format('MMM DD YYYY | h:mmA')
                  : dayJS(meeting.date).format('MMM DD | h:mmA')}
              </time>
            </div>
            <h3 className="capitalize leading-none mb-1">
              {meeting.isDraft && meeting.title}
              {!meeting.isDraft
                && (
                  <Link
                    className="no-underline"
                    to={`/meeting/${meeting.id}/${meeting.slug}`}>
                    {meeting.title}
                  </Link>
                )}
            </h3>
            {props.showOrgName
              && (
                <Link
                  to={`/group/${slugify(meeting.groupName)}`}
                  className="font-bold text-sm text-gray-5 no-underline">
                  {meeting.groupName}
                </Link>
              )}
            {props.isEditable
              && (
                <div className="flex text-sm">
                  {(!isPastMeeting || meeting.isDraft) && (
                    <Link
                      className="mr-1 d:mr-2"
                      to={props.sessionRole === 'admin'
                        ? `/admin/planMeeting?${qs}`
                        : `/group/${slugify(meeting.groupName)}/planMeeting?${qs}`}>
                      <Emoji
                        label="Hand with Pen Emoji"
                        emoji="✍️"
                      />
                      Edit
                    </Link>
                  )}
                  {isPastMeeting
                    && !meeting.isDraft
                    && (
                      <Link
                        className="mr-1 d:mr-2"
                        to={props.sessionRole === 'admin'
                          ? `/admin/planMeeting?${qsWithCopy}`
                          : `/group/${slugify(meeting.groupName)}/planMeeting?${qsWithCopy}`}>
                        <Emoji
                          label="Clipboard Emoji"
                          emoji="📋"
                        />
                        Copy
                      </Link>
                    )}
                  {(!isPastMeeting || meeting.isDraft) && (
                    <button
                      onClick={e => props.deleteEvent(e, meeting.id)}
                      className="border-0 bg-0 mr-1 underline">
                      <Emoji
                        label="Big X Emoji"
                        emoji="✖️"
                      />
                      Delete
                    </button>
                  )}
                  {meeting.isDraft && (
                    <Link to={`/draft/${meeting.id}`}>
                      <Emoji
                        label="Eye Emoji"
                        emoji="👁️"
                      />
                      Preview
                    </Link>
                  )}
                </div>
              )}
          </div>
        </li>
      );
    })}
  </ul>
));

export default MobileMeetings;
