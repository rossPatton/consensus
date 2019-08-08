import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Approval, SimpleMajority } from './_components';

export const Decisions = memo(({ decisions }: { decisions: tDecision[] }) => (
  <ul>
    {decisions.map((decision, i) => (
      <li key={i} className="brdA1 br8 mB2 p3 pL4 rel ovfHide">
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
        <div className="fx aiCtr fs6">
          {decision.rationale && (
            <Link className="mR2" to="">Rationale</Link>
          )}
          {decision.minutes && (
            <Link to="">Minutes</Link>
          )}
        </div>
      </li>
    ))}
  </ul>
));
