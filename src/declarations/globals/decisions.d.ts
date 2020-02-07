// declare interface tCustomVoteResults {
//    [key: string]: number,
// }

// declare type tSimplePollResults = {
//    Abstain: number,
//    No: number,
//    Yes: number,
// };

// declare type tConsensusResults = {
//    Abstain: number,
//    Agree: number,
//    Disagree: number,
//    Block: number,
//    decisionBlocked: boolean,
// };

// declare type tDecisionType = 'n/a'
//   | 'Consensus'
//   | 'Simple Poll'
//   | 'Simple Majority'
//   | 'Approval';

// declare type tDecision = {
//    deadline: string,
//    data: {
//     options: tCustomVoteResults
//       | tSimplePollResults
//       | tConsensusResults, // voting options object with votes
//   },
//    description: string,
//    id: number,
//    isClosed: boolean,
//    orgId: number,
//    orgName: string,
//    title: string,
//    type: tDecisionType,
// }

// declare type tVote = {
//   data: any,
//   decisionId: number,
//   orgId: number,
// }
