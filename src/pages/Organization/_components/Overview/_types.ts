export type tState = {
  decisions: tThunk<tDecision[]>,
  events: tThunk<tEvent[]>,
  isLoading: boolean,
}

export type tComponentProps = {
  decisions: tDecision[],
  events: tEvent[],
  org: tOrg,
};

export type tContainerProps = {
  getEvents: (id: number) => Promise<tThunk<tEvent[]>>,
  getDecisionsByOrg: (opts: { id: number }) => Promise<tThunk<tDecision[]>>,
  decisions: tDecision[],
  events: tEvent[],
  isLoading: boolean,
  org: tOrg,
};
