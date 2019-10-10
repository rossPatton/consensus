import React, {memo} from 'react';

import {tProps} from './_types';

export const ApprovalResults = memo((props: tProps) => (
  <div className="fx aiCtr fs6 fw600 lh1 mB2">
    {props.data.results.map((result, i) => (
      <span key={i} className="fx aiCtr mR3 cap">
        {i < props.data.winners && <span className="bgBlue p1 circ mR1" />}
        {i >= props.data.winners && <span className="bgRed p1 circ mR1" />}
        {result.label}
      </span>
    ))}
  </div>
));
