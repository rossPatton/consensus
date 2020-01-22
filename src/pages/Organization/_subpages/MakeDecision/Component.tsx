// import dayJS from 'dayjs';
// import _ from 'lodash';
// import React, {memo} from 'react';
// import {Link} from 'react-router-dom';

// import {tComponentProps} from './_types';

// export const CreateOrEditEventComponent = memo((props: tComponentProps) => {
//   const {updateState} = props;
//   const isSimplePoll = props.type === 'Simple Poll';
//   const isConsensus = props.type === 'Consensus';

//   // simple polls and consensus have pre-determined options
//   // other decisions allow the user to input their own options
//   const hasCustomChoices = !isSimplePoll && !isConsensus;

//   return (
//     <form action="/api/v1/decisions" id="form" method="POST">
//       <fieldset style={{maxWidth: '760px'}}>
//         <legend className="mB3">
//           <h2>
//             {props.isDraft && 'Edit decision'}
//             {!props.isDraft && 'Make a new decision'}
//           </h2>
//         </legend>
//         <h3>Title</h3>
//         <input
//           className="mB4 row"
//           placeholder="A clear and concise explanation of what we're deciding"
//           value={props.title}
//           onChange={ev => updateState('title', ev.currentTarget.value)}
//         />
//         <h3>Describe the rationale for the decision here</h3>
//         <textarea
//           rows={8}
//           spellCheck
//           className="mB4 row"
//           placeholder="Longer decision description and/or rationale"
//           value={props.description}
//           onChange={ev => updateState('description', ev.currentTarget.value)}
//         />
//         <h3>Is there a deadline?</h3>
//         <p>If yes, the vote will end at that date/time. If no, the vote must be ended manually.</p>
//         <input
//           type="date"
//           className="mB4 row"
//           min={dayJS().toISOString()}
//           value={props.deadline}
//           placeholder="Date to finalize the results"
//           onChange={ev => updateState('deadline', ev.currentTarget.value)}
//         />
//         <h3>What voting system do you want to use?</h3>
//         <select
//           className="row mB4 ffLab ttCap"
//           onChange={ev => props.updateState('type', ev.currentTarget.value)}
//           value={props.type}
//         >
//           <option value="Simple Poll">
//             Simple Poll
//           </option>
//           <option value="Simple Majority">
//             Simple Majority Vote
//           </option>
//           <option value="Approval">
//             Approval Vote
//           </option>
//           <option value="Consensus">
//             Consensus Vote
//           </option>
//         </select>
//         {hasCustomChoices && (
//           <>
//             <h3>What are the voting options?</h3>
//             <div className="fx mB4">
//               <input
//                 className="row mR2"
//                 onChange={ev => updateState('newOption', ev.currentTarget.value)}
//                 placeholder="Example: A candidate's name, or what day to hold a meeting."
//                 value={props.newOption}
//               />
//               <button
//                 type="button"
//                 className="p3 mR2 hvrBgGrey1 trans1"
//                 onClick={() => {
//                   updateState('options', props.newOption);
//                   updateState('newOption', '');
//                 }}>
//                 Add
//               </button>
//             </div>
//           </>
//         )}
//         <div className="mB4">
//           {hasCustomChoices
//             && props.options.length > 0
//             && (
//               <>
//                 <h3>Your selected options:</h3>
//                 <ul className="fs5 copyBlack">
//                   {props.options.map((option, i) => (
//                     <li className="brdA1 br4 fx mB2 p2" key={i}>
//                       <div className="row mR3">
//                         {option}
//                       </div>
//                       <button
//                         type="button"
//                         onClick={() => props.removeOption(option)}>
//                         Remove
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               </>
//             )}
//           {!hasCustomChoices
//             && isSimplePoll
//             && (
//               <>
//                 <h3>Simple poll options</h3>
//                 <ul className="fs5 copyBlack">
//                   <li className="brdA1 br4 fx mB2 p2">
//                     Yes
//                   </li>
//                   <li className="brdA1 br4 fx mB2 p2">
//                     No
//                   </li>
//                   <li className="brdA1 br4 fx mB2 p2">
//                     Abstain
//                   </li>
//                 </ul>
//               </>
//             )}
//           {!hasCustomChoices
//             && isConsensus
//             && (
//               <>
//                 <h3>Consensus options</h3>
//                 <ul className="fs5 copyBlack">
//                   <li className="brdA1 br4 fx mB2 p2">
//                     Agree
//                   </li>
//                   <li className="brdA1 br4 fx mB2 p2">
//                     Disagree
//                   </li>
//                   <li className="brdA1 br4 fx mB2 p2">
//                     Abstain
//                   </li>
//                   <li className="brdA1 br4 fx mB2 p2">
//                     Block
//                   </li>
//                 </ul>
//               </>
//             )}
//         </div>
//         {hasCustomChoices
//           && props.type === 'Approval'
//           && props.options.length > 2
//           && (
//             <div className="mB4">
//               <h3>How many potential winners?</h3>
//               <select className="fs5 copyBlack">
//                 {_.range(1, props.options.length).map((i: number) => (
//                   <option
//                     key={i}
//                     value={i}
//                     className="brdA1 br4 fx mB2 p2">
//                     {i}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}
//         <div className="brdT1 pT4 pB4 mT4 fx aiCtr">
//           <button
//             onClick={props.onSubmit}
//             disabled={!isSimplePoll && props.options.length === 0}
//             className="p3 mR2 hvrBgGrey1 trans1">
//             Publish
//           </button>
//           <button
//             onClick={props.saveAsDraft}
//             className="p3 mR2 hvrBgGrey1 trans1">
//             Save as Draft
//           </button>
//           {props.id && (
//             <Link
//               to={`/decision/${props.id}?isPreview=true`}
//               className="brdA1 br4 lh1 p3 fs6 hvrBgGrey1 trans1">
//               Preview
//             </Link>
//           )}
//         </div>
//       </fieldset>
//     </form>
//   );
// });
