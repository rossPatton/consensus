import cx from 'classnames';
import dayJS from 'dayjs';
import _ from 'lodash';
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
                  ? `/event/${ev.id}?isPreview=true`
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
                    ? `/event/${ev.id}?isPreview=true`
                    : `/event/${ev.id}`}>
                  {ev.title}
                </Link>
              </h3>
              {props.showRSVPs &&
                !props.isEditable &&
                !ev.isDraft && (
                <div
                  className={cx({
                    'fx aiCtr fs6 lh1': true,
                    hide: props.horizontal,
                    o5: isPastEvent,
                  })}>
                  <RSVP event={ev} />
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
              {props.isEditable
              && (
                <div className="fx aiCtr mB1">
                  <div className="bgGrey4 br4 fs7 lh1 mR1 p1 pL2 pR2 white">
                    {ev.isDraft && 'Draft'}
                    {!ev.isDraft && (isPastEvent ? 'Past' : 'Upcoming')}
                  </div>
                  {!isPastEvent && (
                    <Link
                      to={props.sessionRole === 'admin'
                        ? `/admin/planMeeting?${objToQueryString(ev)}`
                        : `/org/${ev.orgId}/planMeeting?${objToQueryString(ev)}`}
                      className="btn fs7 fw600 hvrBgGrey1 lh1 noUnderline p1 pL2 pR2 mR1">
                      <span
                        role="img"
                        aria-label="Hand with Pen Emoji">
                        ✍️
                      </span>
                      Edit
                    </Link>
                  )}
                  {isPastEvent && (
                    <Link
                      to={props.sessionRole === 'admin'
                        ? `/admin/planMeeting?${objToQueryString(ev)}`
                        : `/org/${ev.orgId}/planMeeting?${objToQueryString(ev)}`}
                      className="btn fs7 fw600 hvrBgGrey1 lh1 noUnderline p1 pL2 pR2 mR1">
                      <span
                        role="img"
                        aria-label="Clipboard Emoji">
                        📋
                      </span>
                      Copy
                    </Link>
                  )}
                  {!isPastEvent && (
                    <button
                      onClick={e => props.deleteEvent(e, ev.id)}
                      className="aiCtr fs7 fw600 fx hvrBgGrey1 lh1">
                      <span
                        role="img"
                        aria-label="Big X Emoji">
                        ✖️
                      </span>
                    Delete
                    </button>
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
