import cx from 'classnames';
import dayJS from 'dayjs';
import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {ExternalLink, PlaceholderImage, RSVP} from '../../components';
import {objToQueryString, slugify} from '../../utils';
import {tComponentProps} from './_types';

export const EventsComponent = memo((props: tComponentProps) => (
  <ul
    className={cx({
      'flex flex-col d:flex-row text-left': props.horizontal,
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
            'mb-1': true,
            'd:w-1/4 flex-grow-0': props.horizontal,
            'd:mr-2': props.horizontal && i !== props.events.length - 1,
          })}>
          <div
            className={cx({
              'flex flex-col d:flex-row d:items-center': !props.horizontal,
              'p-2 hover:bg-gray-3 rounded': props.isEditable,
            })}>
            <div
              className={cx({
                'd:max-w-1/3 mb-2': true,
                'bg-white': props.horizontal,
                'd:mb-0 d:mr-2 bg-gray-2': !props.horizontal,
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
              <div className="flex mb-1 text-sm font-bold leading-none">
                <time className="mr-1" dateTime={ev.date}>
                  {isPastEvent
                    ? dayJS(ev.date).format('MMM DD YYYY | h:mmA')
                    : dayJS(ev.date).format('MMM DD | h:mmA')}
                </time>
                {!props.horizontal && (
                  <span className='hidden d:block'>
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
              <h3 className='capitalize d:leading-none mb-1'>
                {ev.isDraft && ev.title}
                {!ev.isDraft
                  && (
                    <Link to={`/event/${slugify(ev.title)}`}>
                      {ev.title}
                    </Link>
                  )}
              </h3>
              {props.showRSVPs &&
                !isPastEvent &&
                !props.isEditable &&
                !ev.isDraft && (
                <div
                  className={cx({
                    hidden: props.horizontal,
                  })}>
                  <RSVP compact event={ev} />
                </div>
              )}
              {props.showOrgName
                && (
                  <Link
                    to={`/org/${slugify(ev.orgName)}`}
                    className="font-bold text-sm leading-none text-gray-4 no-underline hidden d:block">
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
                        <span
                          role="img"
                          aria-label="Hand with Pen Emoji">
                          ✍️
                        </span>
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
                          <span
                            role="img"
                            aria-label="Clipboard Emoji">
                            📋
                          </span>
                          Copy
                        </Link>
                      )}
                    {(!isPastEvent || ev.isDraft) && (
                      <span
                        onClick={e => props.deleteEvent(e, ev.id)}
                        className="text-sm mr-2 underline cursor-ptr">
                        <span
                          role="img"
                          aria-label="Big X Emoji">
                          ✖️
                        </span>
                        Delete
                      </span>
                    )}
                    {ev.isDraft && (
                      <Link
                        to={`/draft/${ev.orgId}?${qs}`}
                        className="text-sm">
                        <span
                          role="img"
                          aria-label="Eye Emoji">
                          👁️
                        </span>
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
