import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Approval, SimpleMajority } from './_components';

export const Decisions = memo(({ decisions }: { decisions: tDecision[] }) => (
  <ul>
    {decisions.map((decision, i) => (
      <li key={i} className="brdA1 br8 mB3 p3 pT2 pL4 rel ovfHide fx">
        <div className="br8 bgGrey1 mR3 col fxNoShrink fxg0">
          <img
            alt=""
            height="100"
            width="100"
            src="https://via.placeholder.com/100"
          />
        </div>
        <div className="col">
          {decision.type === 'Simple Majority' && (
            <SimpleMajority
              date={decision.date}
              data={decision.data}
              title={decision.title}
              type={decision.type}
            />
          )}
          {decision.type === 'Approval' && (
            <Approval
              date={decision.date}
              data={decision.data}
              title={decision.title}
              type={decision.type}
            />
          )}
          <div className="fx aiCtr fs6 fw600">
            <Link
              title="What does this mean?"
              to="/filler">
              {decision.type} Vote
            </Link>
            {decision.rationale && (
              <Link className="mR2" to="">Rationale</Link>
            )}
            {decision.minutes && (
              <Link to="">Minutes</Link>
            )}
          </div>
        </div>
      </li>
    ))}
  </ul>
));
