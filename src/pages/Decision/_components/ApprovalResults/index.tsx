import React, {memo} from 'react';

import {tProps} from './_types';

export const ApprovalResults = memo((props: tProps) => (
  <ul className="fw600 lh1">
    {props.data.results.map((result, i) => (
      <li key={i} className="fx aiCtr mB3 ttCap">
        {i < props.data.winners && <span className="bgBlue p2 circ mR1" />}
        {i >= props.data.winners && <span className="bgRed p2 circ mR1" />}
        {result.label}
      </li>
    ))}
  </ul>
));
