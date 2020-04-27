export type tContainerProps = {
  getGroups: (query: {category: ts.category}) => ts.thunkPayload<ts.group[]>,
  isLoading: boolean,
  match: ts.match & { params: ts.categoryParams },
  group: ts.thunk<ts.group[]>,
}

export type tStore = {
  group: ts.thunk<ts.group[]>,
};
