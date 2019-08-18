export type tComponentProps = {
  decisions: tDecision[],
  events: tEvent[],
  org: tOrg, // inherited
};

export type tContainerProps = tComponentProps & {
  getEventsByOrg: (query: tIdQuery) => Promise<tThunk<tEvent[]>>,
  getDecisionsByOrg: (query: tIdQuery) => Promise<tThunk<tDecision[]>>,
  isLoading: boolean,
  session: tSession,
};

export type tStore = {
  decisions: tThunk<tDecision[]>,
  events: tThunk<tEvent[]>,
  session: tThunk<tSession>,
}
