import dayJS from 'dayjs';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Decisions, DecisionStatus} from '../../components';
import {
  ApprovalResults,
  ApprovalVote,
  SimpleMajorityResults,
  SimpleMajorityVote,
} from './_components';
import {tComponentProps} from './_types';

export const DecisionComponent = memo(({decision, decisions, match}: tComponentProps) => (
  <div className="contain mT4 mB5">
    <small className="fx fw600 lh1 mB3">
      <time className="mR1" dateTime={decision.date}>
        {dayJS(decision.date).format('ddd MMM DD, h:mmA')}
      </time>
    </small>
    <h1 className="mB3 pB3 brdB1 ttCap">
      {decision.title}
    </h1>
    <div className="fx aiCtr fs6 fw600 lh1 mB3">
      <DecisionStatus decision={decision} />
      <Link
        to="/filler"
        title="What does this mean?">
        {decision.type} Vote
      </Link>
    </div>
    <div className="fx mB3">
      <div className="col row mR4">
        <div className="mB4">
          <h2 className="fs3 ffLab mB1">Decision Rationale</h2>
          {decision.description &&
            decision.description.split('\n').map((p: string, i) => (
              <p key={i} className="fs3">
                {p}
              </p>
            ))}
        </div>
        {decision.isClosed && (
          <>
            <h3 className="ffLab mB1">Results</h3>
            {decision.type === 'Approval' && (
              <ApprovalResults data={decision.data} />
            )}
            {decision.type === 'Simple Majority' && (
              <SimpleMajorityResults data={decision.data} />
            )}
          </>
        )}
        {!decision.isClosed && (
          <>
          {decision.type === 'Approval' && (
            <ApprovalVote options={decision.options.list} />
          )}
          {decision.type === 'Simple Majority' && (
            <SimpleMajorityVote options={decision.options.list} />
          )}
          </>
        )}
      </div>
      <aside className="col row mT2">
        {decisions && decisions.length > 0 && (
          <>
            <h2 className="fs5 mB3 ffLab lh1">
              More by <Link to={`/org/${decision.orgId}/overview`}>{decision.orgName}</Link>
            </h2>
            <Decisions
              tiny
              decisions={decisions}
              match={match}
            />
          </>
        )}
      </aside>
    </div>
  </div>
));
