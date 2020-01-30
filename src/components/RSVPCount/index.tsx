import pluralize from 'pluralize';
import React, {memo} from 'react';

import {tProps} from './_types';

const RSVPCount = memo((props: tProps) => {
  const {event, initialRSVP, rsvp} = props;
  const {publicRSVPS, privateRSVPS} = event;

  // initial attendee count from server
  let rsvpCount = publicRSVPS + privateRSVPS;
  // new RSVP status (true or false) from client, if user interacted
  // undefined if user hasn't RSVPed
  const newRSVPStatus = rsvp && (rsvp.publicRSVP || rsvp.privateRSVP);

  // use initial vote for modifying rsvpCount
  if (initialRSVP && !newRSVPStatus) {
    // if user voted already, and un-rsvped, adjust the count down
    rsvpCount = rsvpCount - 1;
  } else if (!initialRSVP && newRSVPStatus) {
    // if user didnt rsvp, and then rsvped, adjust the count up
    rsvpCount = rsvpCount + 1;
  }

  if (rsvpCount === 0) return <>Be the first to RSVP</>;

  return (
    <span className="mR3">
      {rsvpCount} {pluralize('rsvps', rsvpCount)}
    </span>
  );
});

export default RSVPCount;
