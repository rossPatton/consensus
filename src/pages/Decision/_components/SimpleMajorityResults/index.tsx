import React, {memo} from 'react';

import {tProps} from './_types';

const SimpleMajorityResults = memo((props: tProps) => {
  const {data} = props;
  const count = data.Yes + data.No + data.Abstain;
  const yesPercent = Math.round((data.Yes / count) * 100);
  const noPercent = Math.round((data.No / count) * 100);
  const abstainPercent = Math.round((data.Abstain / count) * 100);

  return (
    <ul className="fx aiCtr fw600 lh1 mB3 copyBlack">
      <li className="fx aiCtr mR3">
        <span className="bgBlue p2 circ mR1" />
        {yesPercent}% Approved
      </li>
      <li className="fx aiCtr mR3">
        <span className="bgRed p2 circ mR1" />
        {noPercent}% Rejected
      </li>
      <li className="fx aiCtr">
        <span className="bgYellow p2 circ mR1" />
        {abstainPercent}% Abstained
      </li>
    </ul>
  );
});

export default SimpleMajorityResults;
