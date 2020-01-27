import { match } from 'react-router-dom';

type tProps = {
  match: match & {params: tDirectoryParams},
}

export type tStore = {
  region: tThunk<tRegion>,
};

export type tComponentProps = tProps & {
  citiesToRender: tCity[],
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  region: tRegion,
};

export type tContainerProps = tStore & tProps & {
  getRegion: (params: tDirectoryParams) => tThunk<tRegion>,
  isLoading: boolean,
};
