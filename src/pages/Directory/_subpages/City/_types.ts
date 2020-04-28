

export type tState = {
  category: ts.category,
  groupsBySearch: ts.group[],
};

export type tStore = {
  city: ts.thunk<ts.city>,
  region: ts.thunk<ts.region>,
};

export type tProps = {
  match: ts.match & {params: ts.directoryParams},
};

export type tComponentProps = tProps & {
  category: ts.category,
  city: ts.city,
  onChange: ts.selectChange
  onSearch: ts.inputChange
  groupsToRender: ts.group[],
};

export type tContainerProps = tProps & {
  cityThunk: ts.thunk<ts.city>,
  getCity: (params: ts.directoryParams) => ts.thunk<ts.city>,
  getRegion: (params: ts.directoryParams) => ts.thunk<ts.region>,
  regionThunk: ts.thunk<ts.region>,
};
