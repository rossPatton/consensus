import React, { memo } from 'react';

import {tComponentProps} from './_types';

export const RSVPComponent = memo(({id, role, rsvp, setRsvp}: tComponentProps) => {
  if (role === 'admin') return null;

  return (
    <>
      {!rsvp && (
        <form
          method="POST"
          onSubmit={ev => setRsvp({ev, eventId: id, value: true})}
          action="/api/v1/rsvps">
          <fieldset>
            <button
              className="fx aiCtr br8 brdA1 p1 pL2 pR2 curPtr hvrBgGrey1 trans1 mR2">
              <span
                role="img"
                className="mR1"
                aria-label="Big Plus Sign Emoji">
                ➕
              </span>
              <legend>RSVP</legend>
            </button>
          </fieldset>
        </form>
      )}
      {rsvp && (
        <form
          method="POST"
          action="/api/v1/rsvps"
          onSubmit={ev => setRsvp({ev, eventId: id, value: false})}>
          <fieldset>
            <input type="hidden" name="rsvp" value={id} />
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
    </>
  );
});
