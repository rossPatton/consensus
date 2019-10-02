import cx from 'classnames';
import dayJS from 'dayjs';
import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {ExternalLink, RSVP} from '../../components';
import {objToQueryString} from '../../utils';
import {tComponentProps} from './_types';

export const EventsComponent = memo((props: tComponentProps) => (
  <ul>
    {props.events.map((ev, i) => (
      <li
        key={i}
        className="brdA1 br8 mB2">
        {props.isEditable && (
          <div
            className={cx({
              'brdB1 p2 pL3 pR3 fx aiCtr fs6 jcEnd': true,
              hide: props.tiny,
              bgBlueLite: props.role === 'admin',
              bgGreenLite: props.role === 'facilitator',
            })}>
            <div className="col mR2 fx aiCtr">
              {ev.isDraft && (
                <span className="mR3">
                  This event is a draft.
                </span>
              )}
              {!ev.isDraft && (
                <span className="mR3">
                  This event is published.
                </span>
              )}
              <Link
                to={`createEvent?${objToQueryString(ev)}`}
                className="bgWhite p1 pL2 pR2 hvrBgGrey1 trans1 fw600 br4 lh1 noUnderline brdA1">
                <span
                  role="img"
                  className="mR1"
                  aria-label="Hand with Pen Emoji">
                  ✍️
                </span>
                Edit this event
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
        )}
        <div className="p3 fx">
          {/* <div
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
            */}
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
              <RSVP event={ev} role={props.role} />
              <small
                className={cx({
                  'bgYellowLite br8 p1 pL2 pR2': true,
                  mR2: props.isEditable,
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
            </div>
          </div>
        </div>
      </li>
    ))}
  </ul>
));
