import cx from 'classnames';
import dayJS from 'dayjs';
import _ from 'lodash';
import querystring from 'qs';
import React, {FunctionComponent, memo} from 'react';
import {Link} from 'react-router-dom';

import {Emoji, ExternalLink, MeetingFeaturedImage} from '~app/components';
import {slugify} from '~app/utils';

import {tProps} from './_types';

const DesktopMeetings: FunctionComponent<tProps> = memo(props => {
  const now = dayJS();

  return (
    <ul
      className={cx({
        'animated fadeInUp': true,
        'flex flex-row text-left': props.horizontal,
        'justify-center': props.horizontal && props.meetingsToRender.length > 1,
        'justify-between': props.horizontal && props.meetingsToRender.length === 4,
      })}>
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
      {props.meetingsToRender.map((meeting, i) => {
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
              'mb-2': !props.horizontal,
              'w-3/12 flex-grow-0 bg-white p-1': props.horizontal,
              'mr-2': props.horizontal && i !== props.meetingsToRender.length - 1,
              'opacity-5': isPastMeeting,
            })}>
            <div
              className={cx({
                'flex flex-row items-center': !props.horizontal,
                'p-2 hover:bg-gray-1 rounded': props.isEditable,
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
                    className="mFI"
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
                      {date}
                    </time>
                  </div>
                )}
                {!meeting.isOnline
                  && meeting.location
                  && (
                    <div className="flex mb-1 text-sm text-red-3 font-bold leading-none">
                      <time className="mr-1" dateTime={meeting.date}>
                        {date}
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
                <h3 className="capitalize mb-2 leading-tight">
                  {meeting.isDraft && meeting.title}
                  {!meeting.isDraft
                    && (
                      <Link to={`/meeting/${meeting.id}/${meeting.slug}`}>
                        {meeting.title}
                      </Link>
                    )}
                </h3>
                {props.showGroupName
                  && (
                    <Link
                      to={`/group/${slugify(meeting.groupName)}`}
                      className="font-bold text-sm text-blue-1 no-underline">
                      {meeting.groupName}
                    </Link>
                  )}
                {props.isEditable
                  && (
                    <div className="flex items-center font-semibold leading-none">
                      <Link
                        className="text-sm mr-2 no-underline"
                        to={props.sessionRole === 'admin'
                          ? `/admin/planMeeting?${qs}`
                          : `/group/${slugify(meeting.groupName)}/planMeeting?${qs}`}>
                        <Emoji
                          label="Hand with Pen Emoji"
                          emoji="✍️"
                        /> Edit
                      </Link>
                      {!meeting.isDraft
                        && (
                          <Link
                            className="text-sm mr-2 no-underline"
                            to={props.sessionRole === 'admin'
                              ? `/admin/planMeeting?${qsWithCopy}`
                              : `/group/${slugify(meeting.groupName)}/planMeeting?${qsWithCopy}`}>
                            <Emoji
                              label="Clipboard Emoji"
                              emoji="📋"
                            /> Copy
                          </Link>
                        )}
                      {!isPastMeeting && (
                        <button
                          onClick={e => props.deleteMeeting(e, meeting.id)}
                          className="border-0 bg-0 text-sm mr-2">
                          <Emoji
                            label="Big X Emoji"
                            emoji="✖️"
                          /> Delete
                        </button>
                      )}
                      {meeting.isDraft && (
                        <Link
                          to={`/draft/${meeting.id}`}
                          className="text-sm no-underline">
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
  );
});

export default DesktopMeetings;
