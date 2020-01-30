import React, { memo } from 'react';

import {RSVPCount} from '..';
import {tComponentProps} from './_types';

export const RSVPComponent = memo((props: tComponentProps) => {
  const {event, hasRSVPed, session, setRsvp} = props;
  const {id: eventId} = event;
  const {profile = {}} = session;
  const {privateRSVP: userRSVPsPrivately = true} = profile as tUser;

  return (
    <>
      {!hasRSVPed && (
        <form
          method="POST"
          action="/api/v1/rsvps"
          onSubmit={ev => setRsvp({ev, eventId, value: true})}>
          <fieldset>
            <button className="fx aiCtr br8 brdA1 p1 pL2 pR2 curPtr hvrBgGrey1 trans1 mR2">
              <span
                role="img"
                className="mR1"
                aria-label="Big Plus Sign Emoji">
                ➕
              </span>
              <legend>RSVP {userRSVPsPrivately ? 'Privately' : 'Publicly'}</legend>
            </button>
          </fieldset>
        </form>
      )}
      {hasRSVPed && (
        <form
          method="POST"
          action="/api/v1/rsvps"
          onSubmit={ev => setRsvp({ev, eventId, value: false})}>
          <fieldset>
            <input type="hidden" name="rsvp" value={eventId} />
            <button
              title="Click to cancel your RSVP"
              className="fx aiCtr br8 brdA1 p1 pL2 pR2 curPtr hvrBgGrey1 trans1 mR2">
              <span
                role="img"
                className="mR1"
                aria-label="Thumbs Up Emoji">
                👍
              </span>
              <legend>You&apos;re going!</legend>
            </button>
          </fieldset>
        </form>
      )}
      <RSVPCount
        event={event}
        initialRSVP={props.initialRSVP}
        rsvp={props.rsvp}
      />
    </>
  );
});
