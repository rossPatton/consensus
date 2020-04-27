

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
  onChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  onSearch: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  groupsToRender: ts.group[],
};

export type tContainerProps = tProps & {
  city: ts.thunk<ts.city>,
  getCity: (params: ts.directoryParams) => ts.thunk<ts.city>,
  getRegion: (params: ts.directoryParams) => ts.thunk<ts.region>,
  isCityLoading: boolean,
  isRegionLoading: boolean,
  region: ts.region,
};
