import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { tProps } from './_types';

export const Approval = memo((props: tProps) => {
  const { date, data, title, type } = props;
  // const count = data.choices
  //   .map(choice => choice.count)
  //   .reduce((a, b) => a + b);

  return (
    <>
      <span className="bgGrey2 p1 abs t l b" />
      <div className="fx aiCtr black fw600 LabBlack fs6 mB3">
        <time className="mR2 lh1">{date}</time>
        <div className="bgGrey2 p1 lh1">
          <Link title="What does this mean?" to="/filler">
            {type}
          </Link>
        </div>
      </div>
      <h3 className="mB3 lh1 cap">
        <Link to="/filler">
          {title}
        </Link>
      </h3>
      <div className="fx aiCtr fs6 fw600 black">
        {data.choices.map((choice, i) => (
          <span key={i} className="fx aiCtr mR3 cap">
            {i < data.winners && <span className="bgGreen p1 circ mR1" />}
            {i >= data.winners && <span className="bgRed p1 circ mR1" />}
            {choice.label}
          </span>
        ))}
      </div>
    </>
  );
});
