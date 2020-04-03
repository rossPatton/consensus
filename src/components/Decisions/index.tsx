// import cx from 'classnames';
// import dayJS from 'dayjs';
// import React, {memo} from 'react';
// import {Link} from 'react-router-dom';

// import {DecisionStatus} from '../../components';
// import {POLL} from '../../constants/decisions';
// import {Paginate} from '../../containers';
// import {SimpleMajorityResult} from './_components';
// import {tProps} from './_types';

// const Decisions = memo((props: tProps) => (
//   <Paginate
//     items={props.decisions}
//     render={(decisions: tDecision[]) => (
//       <ul>
//         {decisions.map((decision, i) => (
//           <li
//             key={i}
//             className={cx({
//               'brdA1 br8 mb-3 p-3 pt-2 rel ovfHide': true,
//               pl-4: decision.isClosed,
//             })}>
//             {decision.isClosed && decision.type === POLL && (
//               <SimpleMajorityResult
//                 data={decision.data.options as tCustomVoteResults}
//               />
//             )}
//             <time className="mr-2 leading-none text-bold text-sm mb-2">
//               {decision.isClosed ? 'Voting ended: ' : 'Vote ends: '}
//               {dayJS(decision.deadline).format('ddd MMM DD, h:mmA')}
//             </time>
//             <h3
//               className={cx({
//                 'mb-2 leading-none capitalize': true,
//                 fs3: !props.tiny,
//                 fs4: props.tiny,
//               })}>
//               <Link to={`/decision/${decision.id}`}>
//                 {decision.title}
//               </Link>
//             </h3>
//             {!props.tiny && (
//               <p className="mb-3 lineClamp">
//                 {decision.description}
//               </p>
//             )}
//             <div className="flex flex-col d:flex-row items-center text-sm text-bold leading-none">
//               {!props.tiny && <DecisionStatus decision={decision} />}
//               <Link
//                 to="/filler"
//                 title="What does this mean?">
//                 {decision.type} Vote
//               </Link>
//             </div>
//           </li>
//         ))}
//       </ul>
//     )}
//   />
// ));

// export default Decisions;
