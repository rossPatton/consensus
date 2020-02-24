import cx from 'classnames';
import _ from 'lodash';
import React from 'react';

// import {RSVPCount} from '..';
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
        <div className="fx aiCtr fs6 fw600 lh1">
          <legend className="mR2">
            RSVP {userRSVPsPrivately ? 'Privately' : 'Publicly'}
          </legend>
          <button
            value="yes"
            type={props.isClient ? 'button' : 'submit'}
            onClick={ev => setRsvp({ev, eventId})}
            className={cx({
              'p2 pL3 pR3 mR1': true,
              bgGrey3: !!rsvp && rsvp.value === 'yes',
            })}>
            Yes
          </button>
          <button
            value="no"
            type={props.isClient ? 'button' : 'submit'}
            onClick={ev => setRsvp({ev, eventId})}
            className={cx({
              'p2 pL3 pR3 mR1': true,
              bgGrey3: !!rsvp && rsvp.value === 'no',
            })}>
            No
          </button>
          <button
            value="maybe"
            type={props.isClient ? 'button' : 'submit'}
            onClick={ev => setRsvp({ev, eventId})}
            className={cx({
              'p2 pL3 pR3': true,
              bgGrey3: !!rsvp && rsvp.value === 'maybe',
            })}>
            Maybe
          </button>
        </div>
      </fieldset>
    </form>
  );
};
