import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { tProps } from './_types';

export const Approval = memo((props: tProps) => (
  <>
    <span className="bgGrey2 p1 abs t l b" />
    <div className="fx aiCtr fw600 fs6 mB2">
      <time className="mR2 lh1">{props.date}</time>
      <div className="bgGrey2 p1 lh1">
        <Link title="What does this mean?" to="/filler">
          {props.type}
        </Link>
      </div>
    </div>
    <h3 className="mB3 lh1 ttCap">
      <Link to="/filler">
        {props.title}
      </Link>
    </h3>
    <div className="fx aiCtr fs6 fw600 lh1">
      {props.data.choices.map((choice, i) => (
        <span key={i} className="fx aiCtr mR3 cap">
          {i < props.data.winners && <span className="bgBlue p1 circ mR1" />}
          {i >= props.data.winners && <span className="bgRed p1 circ mR1" />}
          {choice.label}
        </span>
      ))}
    </div>
  </>
));
