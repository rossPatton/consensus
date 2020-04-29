type tProps = {
  match: ts.match & {params: ts.directoryParams},
}

export type tComponentProps = tProps & {
  citiesToRender: ts.city[],
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  region: ts.region,
};

export type tContainerProps = tProps & {
  getRegion: (params: ts.directoryParams) => ts.thunk<ts.region>,
  regionThunk: ts.thunk<ts.region>,
};
