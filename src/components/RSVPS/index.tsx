import pluralize from 'pluralize';
import React, {memo} from 'react';

const RSVPS = memo(({event}: {event: tEvent}) => {
  const {publicRSVPS, privateRSVPS} = event;
  const rsvpCount = publicRSVPS + privateRSVPS;

  if (rsvpCount === 0) {
    return (
      <>
        Be the first to RSVP
      </>
    );
  }

  return (
    <span className="mR3">
      {rsvpCount} {pluralize('rsvps', rsvpCount)}
    </span>
  );
});

export default RSVPS;
