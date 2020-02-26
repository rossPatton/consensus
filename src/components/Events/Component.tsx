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
            'mB2': !props.horizontal,
            'col row': props.horizontal,
            'mR4': props.horizontal && i !== props.events.length - 1,
          })}>
          <div
            className={cx({
              'fx aiCtr': !props.horizontal,
              'p3 hvrBgGrey1 br8': props.isEditable,
            })}>
            <div
              className={cx({
                'mB2 bgWhite': props.horizontal,
                'mR3 bgGrey2': !props.horizontal,
              })}>
              <Link
                className="noUnderline"
                to={ev.isDraft
                  ? `/org/${ev.orgId}/planMeeting?${qs.stringify(ev)}`
                  : `/event/${ev.id}`}>
                <PlaceholderImage
                  height={100}
                  seed={ev.id}
                  width={200}
                />
              </Link>
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
                  mB1: props.isEditable,
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
              {props.showOrgName
                && (
                  <Link
                    to={`/org/${ev.orgId}`}
                    className={cx({
                      'fw600 fs6 lh1': true,
                      o5: isPastEvent,
                    })}>
                    {ev.orgName}
                  </Link>
                )}
              {!isPastEvent
              && props.isEditable
              && (
                <div className="fx aiCtr mB1">
                  <div className="bgGrey4 br4 fs7 lh1 mR2 p1 pL2 pR2 white">
                    {ev.isDraft ? 'Draft' : 'Published'}
                  </div>
                  <div className="fx aiCtr mR1">
                    <Link
                      to={`/org/${ev.orgId}/planMeeting?${objToQueryString(ev)}`}
                      className="btn fs7 fw600 hvrBgGrey1 lh1 noUnderline p1 pL2 pR2">
                      <span
                        role="img"
                        aria-label="Hand with Pen Emoji">
                        ✍️
                      </span>
                      Edit
                    </Link>
                  </div>
                  <button
                    onClick={e => props.deleteEvent(e, ev.id)}
                    className="aiCtr fs7 fw600 fx hvrBgGrey1 lh1">
                    <span
                      role="img"
                      className="mR1"
                      aria-label="Big X Emoji">
                      ✖️
                    </span>
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </li>
      );
    })}
  </ul>
));
