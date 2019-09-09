import cx from 'classnames';
import dayJS from 'dayjs';
import _ from 'lodash';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import { ExternalLink, RSVP } from '../../components';
import { getRandomNum } from '../../utils';
import { tProps } from './_types';

export const EventsComponent = memo((props: tProps) => (
  <ul>
    {props.events.map((ev, i) => (
      <li
        key={i}
        className="brdA1 br8 mB2 p3 fx">
        <div
          className={cx({
            'br8 bgGrey1 mR3 col fxNoShrink fxg0': true,
            hide: props.tiny,
          })}>
          <img
            alt=""
            height="175"
            width="175"
            src={`https://picsum.photos/id/${getRandomNum(0, 100)}/175/175`}
          />
        </div>
        <div className="col">
          <h3
            className={cx({
              'mB2 fx aiCtr ttCap': true,
              fs4: props.tiny,
            })}>
            <Link to={`/event/${ev.id}`}>
              {ev.title}
            </Link>
          </h3>
          <div className="fx aiCtr mB2 fs6 fw600 lh1">
            <time className="mR1" dateTime={ev.date}>
              {dayJS(ev.date).format('ddd MMM DD, h:mmA')}
            </time>
            <span className="mR1">@</span>
            {ev.locationLink && (
              <ExternalLink
                noFollow
                className="mR1"
                to={ev.locationLink}>
                {ev.location}
              </ExternalLink>
            )}
            {!ev.locationLink && ev.location}
          </div>
          <p
            className={cx({
              'mB2 lineClamp': true,
              'pR5': !props.tiny,
              'fs5': props.tiny,
            })}>
            {ev.description}
          </p>
          <div
            className={cx({
              'fx aiCtr fs6 lh1 lsNone': true,
              hide: props.tiny,
            })}>
            {ev.goingCount > 0 && (
              <span className="mR3">
                {ev.goingCount} Attendees
              </span>
            )}
            {!props.isEditable && <RSVP event={ev} />}
            <small
              className={cx({
                'bgYellowLite br8 p1 pL2 pR2': true,
                mR3: props.isEditable,
              })}>
              {ev.isPrivate && (
                <>
                  <span
                    role="img"
                    className="mR1"
                    aria-label="Lock Emoji">
                    🔒
                  </span>
                  Private Event
                </>
              )}
              {!ev.isPrivate && (
                <>
                  <span
                    role="img"
                    className="mR1"
                    aria-label="Tada Emoji">
                    🎉
                  </span>
                  Public Event
                </>
              )}
            </small>
            {props.isEditable && (
              <a
                href="filler"
                className="bgGreenLite br8 p1 pL2 pR2 fw600">
                Edit this event
              </a>
            )}
          </div>
        </div>
      </li>
    ))}
  </ul>
));
