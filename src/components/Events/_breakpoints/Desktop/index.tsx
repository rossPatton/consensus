import {Emoji, ExternalLink, PlaceholderImage} from '@app/components';
import {objToQueryString, slugify} from '@app/utils';
import cx from 'classnames';
import dayJS from 'dayjs';
import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {tComponentProps} from './_types';

const DesktopEvents = memo((props: tComponentProps) => (
  <ul
    className={cx({
      'flex flex-row text-left': props.horizontal,
      'justify-between': props.horizontal && props.events.length === 4,
    })}>
    {props.events.map((ev, i) => {
      const isPastEvent = dayJS(ev.date).isBefore(dayJS());
      const {id, ...evWithoutId} = ev;
      const qs = objToQueryString(ev);
      const qsWithCopy = objToQueryString({...evWithoutId, isCopy: true});

      return (
        <li
          key={ev.id}
          className={cx({
            'mb-2': !props.horizontal,
            'd:mb-1 w-1/4 flex-grow-0': props.horizontal,
            'mr-2': props.horizontal && i !== props.events.length - 1,
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
                  ? `/draft/${ev.orgId}?${qs}`
                  : `/event/${slugify(ev.title)}`}>
                <PlaceholderImage
                  height={240}
                  seed={ev.id}
                  width={480}
                />
              </Link>
            </div>
            <div>
              <div className="flex mb-1 text-sm text-yellow-3 font-bold leading-none">
                <time className="mr-1" dateTime={ev.date}>
                  {isPastEvent
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
              <h3 className="capitalize leading-none mb-1">
                {ev.isDraft && ev.title}
                {!ev.isDraft
                  && (
                    <Link to={`/event/${slugify(ev.title)}`}>
                      {ev.title}
                    </Link>
                  )}
              </h3>
              {props.showOrgName
                && (
                  <Link
                    to={`/org/${slugify(ev.orgName)}`}
                    className="font-bold text-sm text-gray-4 no-underline">
                    {ev.orgName}
                  </Link>
                )}
              {props.isEditable
                && (
                  <div className="flex items-center">
                    {(!isPastEvent || ev.isDraft) && (
                      <Link
                        className="text-sm mr-2"
                        to={props.sessionRole === 'admin'
                          ? `/admin/planMeeting?${qs}`
                          : `/org/${ev.orgName}/planMeeting?${qs}`}>
                        <Emoji
                          label="Hand with Pen Emoji"
                          emoji="✍️"
                        />
                        Edit
                      </Link>
                    )}
                    {isPastEvent
                      && !ev.isDraft
                      && (
                        <Link
                          className="text-sm mr-2"
                          to={props.sessionRole === 'admin'
                            ? `/admin/planMeeting?${qsWithCopy}`
                            : `/org/${ev.orgName}/planMeeting?${qsWithCopy}`}>
                          <Emoji
                            label="Clipboard Emoji"
                            emoji="📋"
                          />
                          Copy
                        </Link>
                      )}
                    {(!isPastEvent || ev.isDraft) && (
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
                        to={`/draft/${ev.orgId}?${qs}`}
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

export default DesktopEvents;
