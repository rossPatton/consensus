import { match } from 'react-router';

type tBase = {
  areDecisionsLoading?: boolean,
  areRolesLoading?: boolean,
  isDecisionLoading?: boolean,
}

export interface tState {
  userVoted: boolean,
}

export interface tStore extends tBase {
  decision: tThunk<tDecision>,
  decisions: tThunk<tDecision[]>,
  roles: tThunk<tRoleMap[]>,
  session: tThunk<tSession>,
}

export interface tComponentProps extends tBase {
  decision: tDecision,
  decisions: tDecision[],
  match: match & { params: { id: number } },
  submitVote: (vote: any) => void,
  userVoted: boolean,
}

export interface tContainerProps extends tComponentProps {
  getDecision: (query: tIdQuery) => Promise<{payload: tDecision}>,
  getDecisionsByOrg:
    (query: tIdQuery & {isClosed: boolean}) => Promise<{payload: tDecision[]}>,
  getRoles: (query: tIdQuery) => Promise<any>,
  roles: tRoleMap[],
  session: tSession,
  submitVote: (ev: any) => Promise<any>,
}

