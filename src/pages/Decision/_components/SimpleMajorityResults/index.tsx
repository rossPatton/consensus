import React, {memo} from 'react';

import {tProps} from './_types';

export const SimpleMajorityResults = memo((props: tProps) => {
  const {results} = props.data;
  const count = results.yes + results.no + results.abstain;
  const yesPercent = Math.round((results.yes / count) * 100);
  const noPercent = Math.round((results.no / count) * 100);
  const abstainPercent = Math.round((results.abstain / count) * 100);

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
