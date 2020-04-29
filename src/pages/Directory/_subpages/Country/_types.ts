export type tState = {
  regionsBySearch: ts.region[],
};

export type tProps = {
  match: ts.match & {params: ts.directoryParams},
};

export type tComponentProps = tProps & {
  country: ts.country,
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  regionsToRender: ts.region[],
};

export type tContainerProps = tProps & {
  countryThunk: ts.thunk<ts.country>,
  getCountry: (params: ts.directoryParams) => ts.thunk<ts.country>,
};
