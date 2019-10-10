import cx from 'classnames';
import React, {memo} from 'react';

import {tProps} from './_types';

export const SimpleMajorityResult = memo((props: tProps) => {
  const {data} = props;
  const {results} = data;
  const count = results.yes + results.no + results.abstain;
  const yesPercent = Math.round((results.yes / count) * 100);
  const noPercent = Math.round((results.no / count) * 100);
  const isPassed = yesPercent > noPercent;

  return (
    <span
      className={cx({
        'p1 abs t l b': true,
        'bgBlue': isPassed,
        'bgRed': !isPassed,
      })}
    />
  );
});
