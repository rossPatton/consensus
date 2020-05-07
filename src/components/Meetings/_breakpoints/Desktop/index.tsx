import cx from 'classnames';
import dayJS from 'dayjs';
import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Emoji, ExternalLink, PlaceholderImage} from '~app/components';
import {objToQueryString, slugify} from '~app/utils';

import {tComponentProps} from './_types';

const DesktopMeetings = memo((props: tComponentProps) => (
  <ul
    className={cx({
      'flex flex-row text-left': props.horizontal,
      'justify-between': props.horizontal && props.meetings.length === 4,
    })}>
    {props.meetings.map((ev, i) => {
      const isPastMeeting = dayJS(ev.date).isBefore(dayJS());
      const {id, ...evWithoutId} = ev;
      const qs = objToQueryString(ev);
      const qsWithCopy = objToQueryString({...evWithoutId, isCopy: true});

      return (
        <li
          key={ev.id}
          className={cx({
            'mb-2': !props.horizontal,
            'd:mb-1 w-1/4 flex-grow-0': props.horizontal,
            'mr-2': props.horizontal && i !== props.meetings.length - 1,
          })}>
          <div
            className={cx({
              'flex flex-row items-center': !props.horizontal,
              'p-2 hover:bg-gray-3 rounded': props.isEditable,
            })}>
            <div
              className={cx({
                'mb-2': true,
                'd:mb-0 mr-2 bg-gray-2 max-w-1/3': !props.horizontal,
              })}>
              <Link
                to={ev.isDraft
                  ? `/draft/${ev.groupId}?${qs}`
                  : `/meeting/${slugify(ev.title)}`}>
                <PlaceholderImage
                  height={240}
                  seed={ev.id}
                  width={480}
                />
              </Link>
            </div>
            <div>
              <div className="flex mb-1 text-sm text-red-3 font-bold leading-none">
                <time className="mr-1" dateTime={ev.date}>
                  {isPastMeeting
                    ? dayJS(ev.date).format('MMM DD YYYY | h:mmA')
                    : dayJS(ev.date).format('MMM DD | h:mmA')}
                </time>
                {!props.horizontal && (
                  <span>
                    <span className="mr-1">@</span>
                    {ev.locationLink && (
                      <ExternalLink
                        noFollow
                        className="mr-1"
                        to={ev.locationLink}>
                        {ev.location}
                      </ExternalLink>
                    )}
                  </span>
                )}
                {!ev.locationLink && ev.location}
              </div>
              <h3 className="capitalize mb-1">
                {ev.isDraft && ev.title}
                {!ev.isDraft
                  && (
                    <Link to={`/meeting/${slugify(ev.title)}`}>
                      {ev.title}
                    </Link>
                  )}
              </h3>
              {props.showOrgName
                && (
                  <Link
                    to={`/group/${slugify(ev.groupName)}`}
                    className="font-bold text-sm text-gray-5 no-underline">
                    {ev.groupName}
                  </Link>
                )}
              {props.isEditable
                && (
                  <div className="flex items-center">
                    {(!isPastMeeting || ev.isDraft) && (
                      <Link
                        className="text-sm mr-2"
                        to={props.sessionRole === 'admin'
                          ? `/admin/planMeeting?${qs}`
                          : `/group/${slugify(ev.groupName)}/planMeeting?${qs}`}>
                        <Emoji
                          label="Hand with Pen Emoji"
                          emoji="✍️"
                        />
                        Edit
                      </Link>
                    )}
                    {isPastMeeting
                      && !ev.isDraft
                      && (
                        <Link
                          className="text-sm mr-2"
                          to={props.sessionRole === 'admin'
                            ? `/admin/planMeeting?${qsWithCopy}`
                            : `/group/${slugify(ev.groupName)}/planMeeting?${qsWithCopy}`}>
                          <Emoji
                            label="Clipboard Emoji"
                            emoji="📋"
                          />
                          Copy
                        </Link>
                      )}
                    {(!isPastMeeting || ev.isDraft) && (
                      <button
                        onClick={e => props.deleteEvent(e, ev.id)}
                        className="border-0 bg-0 text-sm mr-2 underline">
                        <Emoji
                          label="Big X Emoji"
                          emoji="✖️"
                        />
                        Delete
                      </button>
                    )}
                    {ev.isDraft && (
                      <Link
                        to={`/draft/${ev.groupId}?${qs}`}
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
