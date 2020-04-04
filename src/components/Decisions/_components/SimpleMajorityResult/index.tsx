// import cx from 'classnames';
// import React, {memo} from 'react';

// import {tProps} from './_types';

// export const SimpleMajorityResult = memo((props: tProps) => {
//   const {data} = props;
//   const count = data.Yes + data.No + data.Abstain;
//   const yesPercent = Math.round((data.Yes / count) * 100);
//   const noPercent = Math.round((data.No / count) * 100);
//   const isPassed = yesPercent > noPercent;

//   return (
//     <span
//       className={cx({
//         'p-1 abs t l b': true,
//         'bgBlue': isPassed,
//         'bg-red-2': !isPassed,
//       })}
//     />
//   );
// });
