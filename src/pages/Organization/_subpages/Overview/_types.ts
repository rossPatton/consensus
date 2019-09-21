export type tComponentProps = {
  decisions: tDecision[],
  events: tEvent[],
  org: tOrg, // inherited
  role: tRole,
};

export type tContainerProps = tComponentProps & {
  getEvents: (query: tIdQuery) => Promise<tThunk<tEvent[]>>,
  getDecisionsByOrg: (query: tIdQuery) => Promise<tThunk<tDecision[]>>,
  isLoading: boolean,
  session: tSession,
  role: tRole,
};

export type tStore = {
  decisions: tThunk<tDecision[]>,
  events: tThunk<tEvent[]>,
  session: tThunk<tSession>,
}
