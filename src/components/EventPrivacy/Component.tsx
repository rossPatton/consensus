import React, {memo} from 'react';

import {tProps} from './_types';

export const EventPrivacyComponent = memo((props: tProps) => (
  <small className="bgYellowLite br8 p1 pL2 pR2 mR2">
    {props.isPrivate && (
      <>
        <span
          role="img"
          className="mR1"
          aria-label="Lock Emoji">
          🔒
        </span>
        Private Event
      </>
    )}
    {!props.isPrivate && (
      <>
        <span
          role="img"
          className="mR1"
          aria-label="Tada Emoji">
          🎉
        </span>
        Public Event
      </>
    )}
  </small>
));
