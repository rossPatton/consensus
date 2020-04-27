

export type tStore = {
  groupsByUserId: ts.thunk<ts.group[]>,
  user: ts.thunk<ts.user>,
};

export type tProps = {
  match: ts.match & { params: {id: string} },
  user: ts.user,
};

export type tComponentProps = tProps & {
  groups: ts.group[],
}

export type tContainerProps = tProps & {
  getGroupsByUserIdDispatch: (query: ts.groupsByUserIdQuery) => ts.thunkPayload<ts.group[]>,
  getUserByIdDispatch: (query: ts.idQuery) => ts.thunkPayload<ts.user>,
  isLoading: boolean,
  groupsByUserId: ts.group[],
};


