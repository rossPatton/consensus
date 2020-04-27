

export type tState = {
  regionsBySearch: ts.region[],
};

export type tStore = {
  country: ts.thunk<ts.country>,
  isLoading: boolean,
};

export type tProps = {
  match: ts.match & {params: ts.directoryParams},
};

export type tComponentProps = tProps & {
  country: ts.country,
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  regionsToRender: ts.region[],
};

export type tContainerProps = tStore & tProps & {
  getCountry: (params: ts.directoryParams) => ts.thunk<ts.country>,
};
