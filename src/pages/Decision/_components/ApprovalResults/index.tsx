import React, {memo} from 'react';

import {tProps} from './_types';

const ApprovalResults = memo((props: tProps) => (
  <ul className="fw600 lh1">
    {Object.entries(props.data.options).map(([key]) => (
      <li key={key} className="fx aiCtr mB3 ttCap">
        {/* {i < props.data.winners && <span className="bgBlue p2 circ mR1" />}
        {i >= props.data.winners && <span className="bgRed p2 circ mR1" />} */}
        {key}
      </li>
    ))}
  </ul>
));

export default ApprovalResults;
