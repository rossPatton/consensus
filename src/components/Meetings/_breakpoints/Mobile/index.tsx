import cx from 'classnames';
import dayJS from 'dayjs';
import _ from 'lodash';
import querystring from 'qs';
import React, {FunctionComponent, memo} from 'react';
import {Link} from 'react-router-dom';

import {Emoji, MeetingFeaturedImage} from '~app/components';
import {slugify} from '~app/utils';

import {tProps} from './_types';

const MobileMeetings: FunctionComponent<tProps> = memo(props => {
  const now = dayJS();

  return (
    <ul className="text-left animated fadeInUp">
      {props.publishedFilter === 'upcoming'
        && (
          <li className="font-semibold mb-2">
            Upcoming Meetings
          </li>
        )}
      {(props.publishedFilter === 'past' || props.renderPastAsFallback)
        && (
          <li className="font-semibold mb-2">
            Past Meetings
          </li>
        )}
      {props.meetingsToRender.map(meeting => {
        const {id, ...evWithoutId} = meeting;
        const qs = querystring.stringify(meeting);
        const qsWithCopy = querystring.stringify({...evWithoutId, isCopy: true});

        // meetings can be render as all upcoming, all past, or a mix
        const isPastMeeting = dayJS(meeting.date).isBefore(now);

        const date = isPastMeeting
          ? dayJS(meeting.date).format('MMM DD YYYY | h:mmA')
          : dayJS(meeting.date).format('MMM DD | h:mmA');

        return (
          <li
            key={meeting.id}
            className={cx({
              'flex flex-row mb-2': true,
              'opacity-5': isPastMeeting,
            })}>
            {!meeting.isDraft && (
              <Link
                className={cx({
                  'max-w-6/12 min-w-6/12': !props.isEditable,
                  'max-w-4/12 min-w-4/12': props.isEditable,
                })}
                to={meeting.isDraft
                  ? `/draft/${meeting.id}/${meeting.slug}`
                  : `/meeting/${meeting.id}/${meeting.slug}}`}>
                <MeetingFeaturedImage
                  className="mFI"
                  img={meeting.img}
                  seed={meeting.id}
                />
              </Link>
            )}
            {meeting.isDraft && (
              <div className="max-w-4/12">
                <MeetingFeaturedImage
                  className="mFI"
                  img={meeting.img}
                  seed={meeting.id}
                />
              </div>
            )}
            <div className="pl-1">
              <div className="flex mb-1 text-sm text-red-3 leading-none">
                <time className="mr-1" dateTime={meeting.date}>
                  {date}
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
              {props.showGroupName
                && (
                  <Link
                    to={`/group/${slugify(meeting.groupName)}`}
                    className="font-bold text-sm text-gray-5 no-underline leading-none">
                    {meeting.groupName}
                  </Link>
                )}
              {props.isEditable
                && (
                  <div className="flex text-sm leading-none">
                    {!isPastMeeting && (
                      <Link
                        className="mr-1"
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
                    {!meeting.isDraft
                      && (
                        <Link
                          className="mr-1"
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
                    {!isPastMeeting && (
                      <button
                        onClick={e => props.deleteMeeting(e, meeting.id)}
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
  );
});

export default MobileMeetings;
