type tBaseProps = {
  decisions: tDecision[],
  events: tEvent[],
  org: tOrg, // inherited
  usersByOrg: tUsersByOrg,
};

export type tComponentProps = tBaseProps & {
  role: tRole | null,
}

export type tContainerProps = tBaseProps & {
  getEventsByOrg: (query: tIdQuery) => Promise<tThunk<tEvent[]>>,
  getDecisionsByOrg: (query: tIdQuery) => Promise<tThunk<tDecision[]>>,
  getUsersByOrg: (query: tIdQuery) => Promise<tThunk<tUsersByOrg>>,
  isLoading: boolean,
  session: tSession,
};

export type tState = {
  decisions: tThunk<tDecision[]>,
  events: tThunk<tEvent[]>,
  session: tSession,
  usersByOrg: tThunk<tUsersByOrg>,
}
