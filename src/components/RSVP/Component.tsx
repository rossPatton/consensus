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
      onSubmit={ev => setRsvp({ev, eventId})}
      className={cx({
        [props.className]: typeof props.className === 'string',
        'absolute t-hdr l r pt-2 pb-2 bg-gray-2': props.isMobile,
      })}>
      <fieldset>
        <div className="flex items-center justify-center d:justify-start text-sm leading-none">
          <legend className="mr-2">
            RSVP {userRSVPsPrivately ? 'Privately' : 'Publicly'}
          </legend>
          <button
            value="yes"
            type={props.hasMounted ? 'button' : 'submit'}
            onClick={ev => setRsvp({ev, eventId})}
            className={cx({
              'p-2 pl-3 pr-3 mr-1 hover:bg-green-1': true,
              'bg-white': props.isDesktop && rsvp.value === 'yes',
              'bg-0': props.isDesktop && rsvp.value !== 'yes',
              'bg-green-1': props.isMobile && rsvp.value === 'yes',
            })}>
            Yes
          </button>
          <button
            value="no"
            type={props.hasMounted ? 'button' : 'submit'}
            onClick={ev => setRsvp({ev, eventId})}
            className={cx({
              'p-2 pl-3 pr-3 mr-1 hover:bg-red-1': true,
              'bg-white': props.isDesktop && rsvp.value === 'no',
              'bg-0': props.isDesktop && rsvp.value !== 'no',
              'bg-red-1': props.isMobile && rsvp.value === 'no',
            })}>
            No
          </button>
          <button
            value="maybe"
            type={props.hasMounted ? 'button' : 'submit'}
            onClick={ev => setRsvp({ev, eventId})}
            className={cx({
              'p-2 pl-3 pr-3 mr-1 hover:bg-yellow-1': true,
              'bg-white': props.isDesktop && rsvp.value === 'maybe',
              'bg-0': props.isDesktop && rsvp.value !== 'maybe',
              'bg-yellow-1': props.isMobile && rsvp.value === 'maybe',
            })}>
            Maybe
          </button>
        </div>
      </fieldset>
    </form>
  );
};
