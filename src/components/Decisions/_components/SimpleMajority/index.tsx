import cx from 'classnames';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { tProps } from './_types';

export const SimpleMajority = memo((props: tProps) => {
  const { date, data, title, type } = props;
  const count = data.yes + data.no + data.abstain;
  const yesPercent = Math.round((data.yes / count) * 100);
  const noPercent = Math.round((data.no / count) * 100);
  const abstainPercent = Math.round((data.abstain / count) * 100);
  const isPassed = yesPercent > noPercent;

  return (
    <>
      <span
        className={cx({
          'p1 abs t l b': true,
          'bgGreen': isPassed,
          'bgRed': !isPassed,
        })}
      />
      <div className="fx aiCtr black fw600 LabBlack fs6 mB3">
        <time className="mR2 lh1">{date}</time>
        <div className="bgGrey2 p1 lh1">
          <Link title="What does this mean?" to="/filler">
            {type}
          </Link>
        </div>
      </div>
      <h3 className="mB3 lh1">
        <span className="fw600 mR3 black">
          {isPassed ? 'Passed' : 'Rejected'}
        </span>
        <Link to="/filler">
          {title}
        </Link>
      </h3>
      <div className="fs6 fw600 black">
        <span className="mR2">
          {yesPercent}% Approved
        </span>
        <span className="mR2">
          {noPercent}% Rejected
        </span>
        <span className="mR2">
          {abstainPercent}% Abstained
        </span>
      </div>
    </>
  );
});
