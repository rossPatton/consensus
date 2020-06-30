import cx from 'classnames';
import _ from 'lodash';
import React from 'react';

import {tComponentProps} from './_types';

export const RSVPComponent = (props: tComponentProps) => {
  const {meeting, rsvp, session, setRsvp} = props;
  const {id: meetingId} = meeting;
  const {profile = {}} = session;
  const {privateRSVP: userRSVPsPrivately} = profile as ts.user;
  const method = typeof rsvp === 'undefined' ? 'POST' : 'PATCH';

  return (
    <form
      method={method}
      onSubmit={ev => setRsvp({ev, meetingId})}
      className={cx({
        [props.className]: typeof props.className === 'string',
        'absolute t-hdr l r pt-2 pb-2 bg-gray-2': props.isMobile,
      })}>
      <fieldset>
        <div className="text-center d:text-left d:flex d:items-center text-sm leading-none">
          <legend className="block font-semibold mb-1 mr-2 d:mb-0">
            {rsvp?.value
              ? 'Change RSVP'
              : `RSVP ${userRSVPsPrivately ? 'Privately' : 'Publicly'}`}
          </legend>
          <button
            value="yes"
            type={props.hasMounted ? 'button' : 'submit'}
            onClick={ev => setRsvp({ev, meetingId})}
            className={cx({
              'p-2 pl-3 pr-3 mr-1 hover:bg-green-1': true,
              'bg-green-1': rsvp?.value === 'yes',
            })}>
            Yes
          </button>
          <button
            value="no"
            type={props.hasMounted ? 'button' : 'submit'}
            onClick={ev => setRsvp({ev, meetingId})}
            className={cx({
              'p-2 pl-3 pr-3 mr-1 hover:bg-red-1': true,
              'bg-red-1': rsvp?.value === 'no',
            })}>
            No
          </button>
          <button
            value="maybe"
            type={props.hasMounted ? 'button' : 'submit'}
            onClick={ev => setRsvp({ev, meetingId})}
            className={cx({
              'p-2 pl-3 pr-3 mr-1 hover:bg-yellow-1': true,
              'bg-yellow-1': rsvp?.value === 'maybe',
            })}>
            Maybe
          </button>
        </div>
      </fieldset>
    </form>
  );
};
