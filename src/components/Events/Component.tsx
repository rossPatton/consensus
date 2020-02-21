import cx from 'classnames';
import dayJS from 'dayjs';
import _ from 'lodash';
import qs from 'query-string';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {ExternalLink, PlaceholderImage, RSVP} from '../../components';
import {objToQueryString} from '../../utils';
import {tComponentProps} from './_types';

export const EventsComponent = memo((props: tComponentProps) => (
  <ul
    className={cx({
      'fx fxdRow taL': props.horizontal,
      'jcBetween': props.horizontal && props.events.length === 4,
    })}>
    {props.events.map((ev, i) => {
      const isPastEvent = dayJS(ev.date).isBefore(dayJS());

      return (
        <li
          key={ev.id}
          className={cx({
            'mB4': !props.horizontal,
            'col row': props.horizontal,
            'mR4': props.horizontal && i !== props.events.length - 1,
          })}>
          {!isPastEvent && props.isEditable && (
            <div
              className={cx({
                'mB2 fx aiCtr fs6': true,
                hide: props.horizontal,
              })}>
              <div className="mR3 fx aiCtr">
                <Link
                  to={`/org/${ev.orgId}/planMeeting?${objToQueryString(ev)}`}
                  className="bgWhite p1 pL2 pR2 hvrBgGrey1 trans1 fw600 br4 lh1 noUnderline brdA1">
                  <span
                    role="img"
                    className="mR1"
                    aria-label="Hand with Pen Emoji">
                    ✍️
                  </span>
                  Edit this {ev.isDraft ? 'draft' : 'event'}
                </Link>
              </div>
              <button
                onClick={e => props.deleteEvent(e, ev.id)}
                className="bgWhite hvrBgGrey1 trans1 fw600 fx aiCtr lh1 br4">
                <span
                  role="img"
                  className="mR1"
                  aria-label="Big X Emoji">
                  ✖️
                </span>
                Delete this {ev.isDraft ? 'draft' : 'event'}
              </button>
            </div>
          )}
          <div
            className={cx({
              'fx aiCtr': !props.horizontal,
            })}>
            <div
              className={cx({
                'mB2 bgWhite': props.horizontal,
                'mR3 bgGrey2': !props.horizontal,
              })}>
              <PlaceholderImage
                height={100}
                width={200}
              />
            </div>
            <div>
              <div
                className={cx({
                  'fx aiCtr mB1 fs7 fw600 lh1': true,
                  o5: isPastEvent,
                })}>
                <time className="mR1" dateTime={ev.date}>
                  {dayJS(ev.date).format('MMM DD | h:mmA')}
                </time>
                {!props.horizontal && (
                  <>
                    <span className="mR1">@</span>
                    {ev.locationLink && (
                      <ExternalLink
                        noFollow
                        className="mR1"
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
                  'fx aiCtr ttCap': true,
                  fs4: props.horizontal,
                })}>
                <Link
                  className="noUnderline"
                  to={ev.isDraft
                    ? `/org/${ev.orgId}/planMeeting?${qs.stringify(ev)}`
                    : `/event/${ev.id}`}>
                  {ev.title}
                </Link>
              </h3>
              {props.showRSVPs && (
                <div
                  className={cx({
                    'fx aiCtr fs6 lh1': true,
                    hide: props.horizontal,
                    o5: isPastEvent,
                  })}>
                  {!ev.isDraft && <RSVP event={ev} />}
                  {ev.isDraft && 'This event is not published yet. Click to edit.'}
                </div>
              )}
              {props.showOrgName && (
                <Link
                  to={`/org/${ev.orgId}`}
                  className={cx({
                    'fw600 fs6 lh1': true,
                    hide: props.horizontal,
                    o5: isPastEvent,
                  })}>
                  {ev.orgName}
                </Link>
              )}
            </div>
          </div>
        </li>
      );
    })}
  </ul>
));
