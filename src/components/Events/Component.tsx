import cx from 'classnames';
import dayJS from 'dayjs';
import _ from 'lodash';
import pluralize from 'pluralize';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {EventPrivacy, ExternalLink, RSVP} from '../../components';
import {objToQueryString} from '../../utils';
import {tComponentProps} from './_types';

export const EventsComponent = memo((props: tComponentProps) => (
  <ul>
    {props.events.map((ev, i) => {
      const isPastEvent = dayJS(ev.date).isBefore(dayJS());

      return (
        <li
          key={i}
          className="brdA1 br8 mB3">
          {!isPastEvent && props.isEditable && (
            <div
              className={cx({
                'brdB1 p2 pL3 pR3 fx aiCtr fs6 jcEnd': true,
                hide: props.tiny,
              })}>
              <div className="col mR2 fx aiCtr">
                <Link
                  to={`createEvent?${objToQueryString(ev)}`}
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
              <div
                className={cx({
                  'fx aiCtr mB2 fs6 fw600 lh1': true,
                  o5: isPastEvent,
                })}>
                <time className="mR1" dateTime={ev.date}>
                  {dayJS(ev.date).format('ddd MMM DD, h:mmA')}
                </time>
                {!props.tiny && (
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
              <p
                className={cx({
                  'mB2 lineClamp': true,
                  'pR5': !props.tiny,
                  'fs5': props.tiny,
                  o5: isPastEvent,
                })}>
                {ev.description}
              </p>
              <div
                className={cx({
                  'fx aiCtr fs6 lh1 lsNone': true,
                  hide: props.tiny,
                  o5: isPastEvent,
                })}>
                <EventPrivacy isPrivate={ev.isPrivate} />
                <RSVP event={ev} role={props.role} />
                {ev.attendees === 0 && 'Be the first to RSVP to this event'}
                {ev.attendees > 0 && (
                  <Link to="filler" className="mR3">
                    {ev.attendees} {pluralize('attendees', ev.attendees)}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </li>
      );
    })}
  </ul>
));
