import cx from 'classnames';
import _ from 'lodash';
import React from 'react';

import {tComponentProps} from './_types';

export const RSVPComponent = (props: tComponentProps) => {
  const {event, rsvp, session, setRsvp} = props;
  const {id: eventId} = event;
  const {profile = {}} = session;
  const {privateRSVP: userRSVPsPrivately = true} = profile as tUser;
  const method = typeof rsvp === 'undefined' ? 'POST' : 'PATCH';

  return (
    <form
      method={method}
      action="/api/v1/rsvps"
      onSubmit={ev => setRsvp({ev, eventId})}>
      <fieldset>
        <div className="flex items-center text-sm text-bold leading-none">
          <legend className="mr-2">
            RSVP {userRSVPsPrivately ? 'Privately' : 'Publicly'}
          </legend>
          <button
            value="yes"
            type={props.isClient ? 'button' : 'submit'}
            onClick={ev => setRsvp({ev, eventId})}
            className={cx({
              'mr-1 hover:bg-gray-11': true,
              'p-2 pl-3 pr-3': !props.compact,
              'bg-gray-3': !!rsvp && rsvp.value === 'yes',
            })}>
            Yes
          </button>
          <button
            value="no"
            type={props.isClient ? 'button' : 'submit'}
            onClick={ev => setRsvp({ev, eventId})}
            className={cx({
              'mr-1 hover:bg-gray-1': true,
              'p-2 pl-3 pr-3': !props.compact,
              'bg-gray-3': !!rsvp && rsvp.value === 'no',
            })}>
            No
          </button>
          <button
            value="maybe"
            type={props.isClient ? 'button' : 'submit'}
            onClick={ev => setRsvp({ev, eventId})}
            className={cx({
              'mr-1 hover:bg-gray-1': true,
              'p-2 pl-3 pr-3': !props.compact,
              'bg-gray-3': !!rsvp && rsvp.value === 'maybe',
            })}>
            Maybe
          </button>
        </div>
      </fieldset>
    </form>
  );
};
