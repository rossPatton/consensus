import cx from 'classnames';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {DecisionStatus} from '../../components';
import {SimpleMajorityResult} from './_components';
import {tProps} from './_types';

export const Decisions = memo((props: tProps) => (
  <ul>
    {props.decisions.map((decision, i) => (
      <li key={i} className="brdA1 br8 mB2 p3 pT2 pL4 rel ovfHide">
        {decision.isClosed && decision.type === 'Simple Majority' && (
          <SimpleMajorityResult
            data={decision.data}
          />
        )}
        <time className="mR2 lh1 fw600 fs6 mB2">{decision.date}</time>
        <h3
          className={cx({
            'mB2 lh1 ttCap': true,
            fs3: !props.tiny,
            fs4: props.tiny,
          })}>
          <Link to={`/decision/${decision.id}`}>
            {decision.title}
          </Link>
        </h3>
        {!props.tiny && (
          <p className="mB3 lineClamp">
            {decision.description}
          </p>
        )}
        <div className="fx aiCtr fs6 fw600 lh1">
          {!props.tiny && <DecisionStatus decision={decision} />}
          <Link
            to="/filler"
            title="What does this mean?">
            {decision.type} Vote
          </Link>
        </div>
      </li>
    ))}
  </ul>
));
