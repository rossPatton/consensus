import React, {memo} from 'react';

import {SimpleMajorityResult} from './_components';
import {tProps} from './_types';

const DecisionStatus = memo((props: tProps) => (
  <>
    {props.decision.isClosed &&
      props.decision.type === 'Simple Majority' && (
      <SimpleMajorityResult data={props.decision.data} />
    )}
    {!props.decision.isClosed && (
      <small className="bgGreenLite br8 p1 pL2 pR2 mR2">
        <span
          role="img"
          className="mR1"
          aria-label="Check Mark Emoji">
          ✔️
        </span>
        Voting Open
      </small>
    )}
    {props.decision.isClosed && (
      <small className="bgYellowLite br8 p1 pL2 pR2 mR2">
        <span
          role="img"
          className="mR1"
          aria-label="Big X Emoji">
          ✖️
        </span>
        Voting Closed
      </small>
    )}
  </>
));

export default DecisionStatus;
