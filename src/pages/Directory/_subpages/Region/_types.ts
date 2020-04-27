

type tProps = {
  match: ts.match & {params: ts.directoryParams},
}

export type tStore = {
  region: ts.thunk<ts.region>,
};

export type tComponentProps = tProps & {
  citiesToRender: ts.city[],
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  region: ts.region,
};

export type tContainerProps = tStore & tProps & {
  getRegion: (params: ts.directoryParams) => ts.thunk<ts.region>,
  isLoading: boolean,
};
