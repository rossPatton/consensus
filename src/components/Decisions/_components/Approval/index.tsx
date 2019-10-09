import React, {memo} from 'react';
import {Link} from 'react-router-dom';

export const Approval = memo((props: tDecision) => {
  const {date, description, title} = props;
  const data = props.data as tApprovalData;

  return (
    <>
      <span className="bgGrey2 p1 abs t l b" />
      <time className="fx aiCtr fw600 fs6 mB2 lh1">
        {date}
      </time>
      <h3 className="mB2 lh1 ttCap">
        <Link to="/filler">
          {title}
        </Link>
      </h3>
      <p className="mB2 lineClamp">
        {description}
      </p>
      <div className="fx aiCtr fs6 fw600 lh1 mB2">
        {data.choices.map((choice, i) => (
          <span key={i} className="fx aiCtr mR3 cap">
            {i < props.data.winners && <span className="bgBlue p1 circ mR1" />}
            {i >= props.data.winners && <span className="bgRed p1 circ mR1" />}
            {choice.label}
          </span>
        ))}
      </div>
    </>
  );
});
