// import React, {memo} from 'react';

// import {tComponentProps} from './_types';

// export const SimpleMajorityVoteComponent = memo((props: tComponentProps) => (
//   <form method="POST">
//     <fieldset>
//       <legend className="mB2 fs4">
//         Choices:
//       </legend>
//       <ul className="fs6 fw600 lh1">
//         {Object.keys(props.options).map((option, i) => (
//           <li
//             key={i}
//             className="mB3 ttCap">
//             <button
//               value={option}
//               onClick={props.selectOption}
//               disabled={props.userVoted && props.selectedOption !== option}
//               className="row p3 taL hvrBgGrey1 trans1">
//               <input
//                 readOnly
//                 autoComplete="nope"
//                 checked={option === props.selectedOption}
//                 className="mR2"
//                 type="radio"
//               />
//               {option}
//             </button>
//           </li>
//         ))}
//         <li>
//           <button
//             type="button"
//             disabled={props.userVoted}
//             className="p3 taL hvrBgGrey1 trans1"
//             onClick={ev => {
//               ev.preventDefault();
//               props.submitVote(props.selectedOption);
//             }}>
//             {props.userVoted ? 'Thanks for your vote!' : 'Submit your vote'}
//           </button>
//         </li>
//       </ul>
//     </fieldset>
//   </form>
// ));
