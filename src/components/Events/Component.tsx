import cx from 'classnames';
import dayJS from 'dayjs';
import _ from 'lodash';
import qs from 'query-string';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {ExternalLink, RSVP} from '../../components';
import {tComponentProps} from './_types';

export const EventsComponent = memo((props: tComponentProps) => (
  <ul
    className={cx({
      'fx fxdRow': props.horizontal,
      'jcBetween': props.horizontal && props.events.length === 4,
    })}>
    {props.events.map((ev, i) => {
      const isPastEvent = dayJS(ev.date).isBefore(dayJS());

      return (
        <li
          key={ev.id}
          className={cx({
            'fx aiCtr mB3': !props.horizontal,
            'mR4': props.horizontal && i !== props.events.length - 1,
          })}>
          {/* {!isPastEvent && props.isEditable && (
            <div
              className={cx({
                'brdB1 p2 pL3 pR3 fx aiCtr fs6 jcEnd': true,
                hide: props.horizontal,
              })}>
              <div className="col mR2 fx aiCtr">
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
                className="bgWhite hvrBgGrey1 trans1 fw600 fx aiCtr lh1 br4 jcEnd">
                <span
                  role="img"
                  className="mR1"
                  aria-label="Big X Emoji">
                  ✖️
                </span>
                Delete this {ev.isDraft ? 'draft' : 'event'}
              </button>
            </div>
          )} */}
          <div
            className={cx({
              'brdA1 br8 square': true,
              'mB2 bgWhite': props.horizontal,
              'mR3 bgGrey2': !props.horizontal,
            })}
          />
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
            {/* <p
                className={cx({
                  'mB2 lineClamp': true,
                  'pR5': !props.horizontal,
                  'fs5': props.horizontal,
                  o5: isPastEvent,
                })}>
                {ev.description}
              </p> */}
            {!props.isDashboard && (
              <div
                className={cx({
                  'fx aiCtr fs6 lh1': true,
                  'mB1': props.sessionRole !== 'admin',
                  hide: props.horizontal,
                  o5: isPastEvent,
                })}>
                {!ev.isDraft && <RSVP event={ev} />}
                {ev.isDraft && 'This event is not published yet. Click to edit.'}
              </div>
            )}
            {props.isDashboard && (
              <div
                className={cx({
                  'fw600 fs6 lh1': true,
                  hide: props.horizontal,
                  o5: isPastEvent,
                })}>
                {ev.orgName}
              </div>
            )}
          </div>
        </li>
      );
    })}
  </ul>
));
