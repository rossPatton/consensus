export type tContainerProps = {
  getGroups: (query: {category: ts.category}) => ts.thunkPayload<ts.group[]>,
  match: ts.match & { params: ts.categoryParams },
  groupsThunk: ts.thunk<ts.group[]>,
}

export type tStore = {
  groups: ts.thunk<ts.group[]>,
};
