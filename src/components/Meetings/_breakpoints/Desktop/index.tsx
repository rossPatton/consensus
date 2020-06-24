import cx from 'classnames';
import dayJS from 'dayjs';
import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Emoji, ExternalLink, MeetingFeaturedImage} from '~app/components';
import {objToQueryString, slugify} from '~app/utils';

import {tComponentProps} from './_types';

const DesktopMeetings = memo((props: tComponentProps) => (
  <ul
    className={cx({
      'flex flex-row text-left': props.horizontal,
      'justify-between': props.horizontal && props.meetings.length === 4,
    })}>
    {props.meetings.map((meeting, i) => {
      const isPastMeeting = dayJS(meeting.date).isBefore(dayJS());
      const {id, ...evWithoutId} = meeting;
      const qs = objToQueryString(meeting);
      const qsWithCopy = objToQueryString({...evWithoutId, isCopy: true});

      return (
        <li
          key={meeting.id}
          className={cx({
            'mb-2': !props.horizontal,
            'd:mb-1 w-3/12 flex-grow-0': props.horizontal,
            'mr-2': props.horizontal && i !== props.meetings.length - 1,
          })}>
          <div
            className={cx({
              'flex flex-row items-center': !props.horizontal,
              'p-2 hover:bg-gray-3 rounded': props.isEditable,
            })}>
            <div
              className={cx({
                'mr-2 max-w-4/12 min-w-4/12': !props.horizontal,
                'mb-2': props.horizontal,
              })}>
              <Link
                to={meeting.isDraft
                  ? `/draft/${meeting.id}/${meeting.slug}`
                  : `/meeting/${meeting.id}/${meeting.slug}`}>
                <MeetingFeaturedImage
                  img={meeting.img}
                  seed={meeting.id}
                />
              </Link>
            </div>
            <div>
              {meeting.isOnline && (
                <div className="flex items-center mb-1 text-red-3 text-sm font-bold">
                  <img
                    alt=""
                    height="10"
                    className="mr-1"
                    src="/images/online.svg"
                    width="16"
                  /> Online <span className="ml-1 mr-1">@</span>
                  <time dateTime={meeting.date}>
                    {isPastMeeting
                      ? dayJS(meeting.date).format('MMM DD YYYY | h:mmA')
                      : dayJS(meeting.date).format('MMM DD | h:mmA')}
                  </time>
                </div>
              )}
              {!meeting.isOnline
                && meeting.location
                && (
                  <div className="flex mb-1 text-sm text-red-3 font-bold leading-none">
                    <time className="mr-1" dateTime={meeting.date}>
                      {isPastMeeting
                        ? dayJS(meeting.date).format('MMM DD YYYY | h:mmA')
                        : dayJS(meeting.date).format('MMM DD | h:mmA')}
                    </time>
                    {!props.horizontal && (
                      <span>
                        <span className="mr-1">@</span>
                        {meeting.locationLink && (
                          <ExternalLink
                            noFollow
                            className="mr-1"
                            to={meeting.locationLink}>
                            {meeting.location}
                          </ExternalLink>
                        )}
                      </span>
                    )}
                    {!meeting.locationLink && meeting.location}
                  </div>
                )}
              <h3 className="capitalize mb-1">
                {meeting.isDraft && meeting.title}
                {!meeting.isDraft
                  && (
                    <Link to={`/meeting/${meeting.id}/${meeting.slug}`}>
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
                  <div className="flex items-center font-semibold leading-none">
                    {(!isPastMeeting || meeting.isDraft) && (
                      <Link
                        className="text-sm mr-2"
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
                          className="text-sm mr-2"
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
                        className="border-0 bg-0 text-sm mr-2 underline">
                        <Emoji
                          label="Big X Emoji"
                          emoji="✖️"
                        />
                        Delete
                      </button>
                    )}
                    {meeting.isDraft && (
                      <Link
                        to={`/draft/${meeting.id}`}
                        className="text-sm">
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
          </div>
        </li>
      );
    })}
  </ul>
));

export default DesktopMeetings;
