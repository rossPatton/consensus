// import React, {memo} from 'react';

// import {tProps} from './_types';

// export const SimpleMajorityResult = memo((props: tProps) => {
//   const {data} = props;
//   const count = data.Yes + data.No + data.Abstain;
//   const yesPercent = Math.round((data.Yes / count) * 100);
//   const noPercent = Math.round((data.No / count) * 100);
//   const isPassed = yesPercent > noPercent;

//   return (
//     <>
//       {isPassed && (
//         <small className="bgBlueLite br8 p1 pL2 pR2 mR2">
//           <span
//             role="img"
//             className="mR1"
//             aria-label="Check Mark Emoji">
//             ✔️
//           </span>
//           Decision Approved
//         </small>
//       )}
//       {!isPassed && (
//         <small className="bgRedLite br8 p1 pL2 pR2 mR2">
//           <span
//             role="img"
//             className="mR1"
//             aria-label="Big X Emoji">
//             ❌
//           </span>
//           Decision Rejected
//         </small>
//       )}
//     </>
//   );
// });
