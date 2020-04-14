import cx from 'classnames';
import dayJS from 'dayjs';
import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {PlaceholderImage} from '../../../../components';
import {objToQueryString, slugify} from '../../../../utils';
import {tComponentProps} from './_types';

const MobileEvents = memo((props: tComponentProps) => (
  <ul className="text-left">
    {props.events.map(ev => {
      const isPastEvent = dayJS(ev.date).isBefore(dayJS());
      const {id, ...evWithoutId} = ev;
      const qs = objToQueryString(ev);
      const qsWithCopy = objToQueryString({...evWithoutId, isCopy: true});

      return (
        <li
          key={ev.id}
          className="flex flex-row mb-2">
          {!ev.isDraft && (
            <Link
              className={cx({
                'max-w-1/2': !props.isEditable,
                'max-w-1/3': props.isEditable,
              })}
              to={ev.isDraft
                ? `/draft/${ev.orgId}?${qs}`
                : `/event/${slugify(ev.title)}`}>
              <PlaceholderImage
                height={240}
                seed={ev.id}
                width={480}
              />
            </Link>
          )}
          {ev.isDraft && (
            <div className="max-w-1/3">
              <PlaceholderImage
                height={240}
                seed={ev.id}
                width={480}
              />
            </div>
          )}
          <div className="pl-1">
            <div className="flex mb-1 text-sm text-yellow-3 leading-none">
              <time className="mr-1" dateTime={ev.date}>
                {isPastEvent
                  ? dayJS(ev.date).format('MMM DD YYYY | h:mmA')
                  : dayJS(ev.date).format('MMM DD | h:mmA')}
              </time>
            </div>
            <h3 className="capitalize leading-none mb-1">
              {ev.isDraft && ev.title}
              {!ev.isDraft
                && (
                  <Link
                    className="no-underline"
                    to={`/event/${slugify(ev.title)}`}>
                    {ev.title}
                  </Link>
                )}
            </h3>
            {props.showOrgName
              && (
                <Link
                  to={`/org/${slugify(ev.orgName)}`}
                  className="font-bold text-sm text-gray-4 no-underline">
                  {ev.orgName}
                </Link>
              )}
            {props.isEditable
              && (
                <div className="flex text-sm">
                  {(!isPastEvent || ev.isDraft) && (
                    <Link
                      className="mr-1 d:mr-2"
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
                        className="mr-1 d:mr-2"
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
                      className="mr-1 d:mr-2 underline cursor-ptr">
                      <span
                        role="img"
                        aria-label="Big X Emoji">
                        ✖️
                      </span>
                      Delete
                    </span>
                  )}
                  {ev.isDraft && (
                    <Link to={`/draft/${ev.orgId}?${qs}`}>
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
        </li>
      );
    })}
  </ul>
));

export default MobileEvents;
