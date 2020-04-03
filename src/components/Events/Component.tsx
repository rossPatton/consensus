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
            'mb-4': true,
            'd:mb-2': !props.horizontal,
            'w-full': props.horizontal,
            'd:mr-4': props.horizontal && i !== props.events.length - 1,
          })}>
          <div
            className={cx({
              'flex items-center': !props.horizontal,
              'p-3 hover:bg-gray-1 br8': props.isEditable,
            })}>
            <div
              className={cx({
                'mb-2 bg-white': props.horizontal,
                'mr-3 bg-gray-2': !props.horizontal,
              })}>
              <Link
                className="no-underline"
                to={ev.isDraft
                  ? `/event/${ev.id}?isPreview=true`
                  : `/event/${slugify(ev.title)}`}>
                <PlaceholderImage
                  height={100}
                  seed={ev.id}
                  width={200}
                />
              </Link>
            </div>
            <div>
              <div className="flex flex-col d:flex-row d:items-center mb-2 fs7 text-bold leading-none">
                <time className="mr-1" dateTime={ev.date}>
                  {isPastEvent
                    ? dayJS(ev.date).format('MMM DD YYYY | h:mmA')
                    : dayJS(ev.date).format('MMM DD | h:mmA')}
                </time>
                {!props.horizontal && (
                  <>
                    <span className="mr-1">@</span>
                    {ev.locationLink && (
                      <ExternalLink
                        noFollow
                        className="mr-1"
                        to={ev.locationLink}>
                        {ev.location}
                      </ExternalLink>
                    )}
                  </>
                )}
                {!ev.locationLink && ev.location}
              </div>
              <h3
                className={cx({
                  'flex items-center capitalize leading-none': true,
                  'mb-1': props.isEditable,
                  'mb-2': props.showRSVPs,
                  'text-3': props.horizontal,
                })}>
                <Link
                  className="no-underline"
                  to={ev.isDraft
                    ? `/event/${ev.id}?isPreview=true`
                    : `/event/${slugify(ev.title)}`}>
                  {ev.title}
                </Link>
              </h3>
              {props.showRSVPs &&
                !isPastEvent &&
                !props.isEditable &&
                !ev.isDraft && (
                <div
                  className={cx({
                    'flex items-center fs7 leading-none': true,
                    hide: props.horizontal,
                  })}>
                  <RSVP compact event={ev} />
                </div>
              )}
              {props.showOrgName
                && (
                  <Link
                    to={`/org/${slugify(ev.orgName)}`}
                    className={cx({
                      'text-bold text-sm leading-none': true,
                      o5: isPastEvent,
                    })}>
                    {ev.orgName}
                  </Link>
                )}
              {props.isEditable
              && (
                <div className="flex flex-col d:flex-row items-center mb-1">
                  <div className="bgGrey4 br4 fs7 leading-none mr-1 p-1 pl-2 pr-2 white">
                    {ev.isDraft && 'Draft'}
                    {!ev.isDraft && (isPastEvent ? 'Past' : 'Upcoming')}
                  </div>
                  {(!isPastEvent || ev.isDraft) && (
                    <Link
                      to={props.sessionRole === 'admin'
                        ? `/admin/planMeeting?${qs}`
                        : `/org/${ev.orgName}/planMeeting?${qs}`}
                      className="btn fs7 text-bold hover:bg-gray-11 leading-none p-1 pl-2 pr-2 mr-1">
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
                        to={props.sessionRole === 'admin'
                          ? `/admin/planMeeting?${qsWithCopy}`
                          : `/org/${ev.orgName}/planMeeting?${qsWithCopy}`}
                        className="btn fs7 text-bold hover:bg-gray-11 leading-none p-1 pl-2 pr-2 mr-1">
                        <span
                          role="img"
                          aria-label="Clipboard Emoji">
                          📋
                        </span>
                        Copy
                      </Link>
                    )}
                  {(!isPastEvent || ev.isDraft) && (
                    <button
                      onClick={e => props.deleteEvent(e, ev.id)}
                      className="items-center fs7 text-bold flex hover:bg-gray-11 leading-none mr-1">
                      <span
                        role="img"
                        aria-label="Big X Emoji">
                        ✖️
                      </span>
                      Delete
                    </button>
                  )}
                  {ev.isDraft && (
                    <Link
                      to={`/draft/${ev.orgId}?${qs}`}
                      className="btn fs7 text-bold hover:bg-gray-11 leading-none p-1 pl-2 pr-2 mr-1">
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
