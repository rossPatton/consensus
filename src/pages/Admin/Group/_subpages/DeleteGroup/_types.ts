export type tState = {
  error: string,
};

export type tContainerProps = {
  patchGroupDispatch: (query: ts.groupUpsertQuery) => ts.thunkPayload<ts.session>,
  session: ts.session,
};

export type tComponentProps = tState & {
  deleteGroup: () => void,
  session: ts.session,
};
