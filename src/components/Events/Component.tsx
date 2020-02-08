import cx from 'classnames';
import dayJS from 'dayjs';
import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {ExternalLink, RSVP} from '../../components';
// import {objToQueryString} from '../../utils';
import {tComponentProps} from './_types';

export const EventsComponent = memo((props: tComponentProps) => (
  <ul>
    {props.events.map(ev => {
      const isPastEvent = dayJS(ev.date).isBefore(dayJS());

      return (
        <li
          key={ev.id}
          className="fx mB3">
          {/* {!isPastEvent && props.isEditable && (
            <div
              className={cx({
                'brdB1 p2 pL3 pR3 fx aiCtr fs6 jcEnd': true,
                hide: props.tiny,
              })}>
              <div className="col mR2 fx aiCtr">
                <Link
                  to={`/org/${ev.orgId}/createEvent?${objToQueryString(ev)}`}
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
          <div className="bgGrey2 square mR3" />
          <div className="col">
            <div
              className={cx({
                'fx aiCtr mB2 fs6 fw600 lh1': true,
                o5: isPastEvent,
              })}>
              <time className="mR1" dateTime={ev.date}>
                {dayJS(ev.date).format('MMM DD | h:mmA')}
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
            <h3
              className={cx({
                'mB2 fx aiCtr ttCap': true,
                fs4: props.tiny,
              })}>
              <Link className="noUnderline" to={`/event/${ev.id}`}>
                {ev.title}
              </Link>
            </h3>
            {/* <p
                className={cx({
                  'mB2 lineClamp': true,
                  'pR5': !props.tiny,
                  'fs5': props.tiny,
                  o5: isPastEvent,
                })}>
                {ev.description}
              </p> */}
            <div
              className={cx({
                'fx aiCtr fs6 lh1 lsNone': true,
                hide: props.tiny,
                o5: isPastEvent,
              })}>
              <RSVP event={ev} />
            </div>
          </div>
        </li>
      );
    })}
  </ul>
));
