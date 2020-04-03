// import React, {memo} from 'react';

// import {POLL} from '../../constants/decisions';
// import {SimpleMajorityResult} from './_components';
// import {tProps} from './_types';

// const DecisionStatus = memo((props: tProps) => (
//   <>
//     {props.decision.isClosed &&
//       props.decision.type === POLL && (
//       <SimpleMajorityResult
//         data={props.decision.data.options as tCustomVoteResults}
//       />
//     )}
//     {!props.decision.isClosed && (
//       <small className="bgGreenLite br8 p-1 pl-2 pr-2 mr-2">
//         <span
//           role="img"
//           className="mr-1"
//           aria-label="Check Mark Emoji">
//           ✔️
//         </span>
//         Voting Open
//       </small>
//     )}
//     {props.decision.isClosed && (
//       <small className="bgYellowLite br8 p-1 pl-2 pr-2 mr-2">
//         <span
//           role="img"
//           className="mr-1"
//           aria-label="Big X Emoji">
//           ✖️
//         </span>
//         Voting Closed
//       </small>
//     )}
//   </>
// ));

// export default DecisionStatus;
