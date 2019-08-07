export type tState = {
  decisions: tThunk<tDecision[]>,
  events: tThunk<tEvent[]>,
}

export type tComponentProps = {
  decisions: tDecision[],
  events: tEvent[],
  org: tOrg, // inherited
};

export type tContainerProps = tComponentProps & {
  getEventsByOrg: (query: tIdQuery) => Promise<tThunk<tEvent[]>>,
  getDecisionsByOrg: (query: tIdQuery) => Promise<tThunk<tDecision[]>>,
  isLoading: boolean,
};
