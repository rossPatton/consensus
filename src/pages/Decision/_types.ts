// import { match } from 'react-router';

// type tBase = {
//   areRolesLoading?: boolean,
//   areVotesLoading?: boolean,
//   isDecisionLoading?: boolean,
// }

// export interface tState {
//   userVoted: boolean,
// }

// export interface tStore extends tBase {
//   decision: tThunk<tDecision>,
//   decisions: tThunk<tDecision[]>,
//   roles: tThunk<tRoleMap[]>,
//   session: tThunk<tSession>,
//   votes: tThunk<any>,
// }

// export type tProps = tBase & {
//   votes: string[],
// }

// export interface tComponentProps extends tProps {
//   decision: tDecision,
//   decisions: tDecision[],
//   match: match & { params: tPaginateParams },
//   submitVote: (vote: tVote) => void,
//   userVoted: boolean,
// }

// export interface tContainerProps extends tComponentProps {
//   getDecision: (query: tIdQuery) => Promise<{payload: tDecision}>,
//   getDecisionsByOrg:
//     (query: tIdQuery & {isClosed: boolean}) => Promise<{payload: tDecision[]}>,
//   getRoles: (query: tIdQuery) => Promise<any>,
//   getVotes: (query: any) => Promise<any>,
//   roles: tRoleMap[],
//   session: tSession,
//   submitVote: (ev: any) => Promise<any>,
// }

