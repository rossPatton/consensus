// declare interface tCustomVoteResults {
//   readonly [key: string]: number,
// }

// declare type tSimplePollResults = {
//   readonly Abstain: number,
//   readonly No: number,
//   readonly Yes: number,
// };

// declare type tConsensusResults = {
//   readonly Abstain: number,
//   readonly Agree: number,
//   readonly Disagree: number,
//   readonly Block: number,
//   readonly decisionBlocked: boolean,
// };

// declare type tDecisionType = 'n/a'
//   | 'Consensus'
//   | 'Simple Poll'
//   | 'Simple Majority'
//   | 'Approval';

// declare type tDecision = {
//   readonly deadline: string,
//   readonly data: {
//     options: tCustomVoteResults
//       | tSimplePollResults
//       | tConsensusResults, // voting options object with votes
//   },
//   readonly description: string,
//   readonly id: number,
//   readonly isClosed: boolean,
//   readonly orgId: number,
//   readonly orgName: string,
//   readonly title: string,
//   readonly type: tDecisionType,
// }

// declare type tVote = {
//   data: any,
//   decisionId: number,
//   orgId: number,
// }
