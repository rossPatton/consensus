import { match } from 'react-router-dom';

export type tProps = {
  citiesToRender: tCity[],
  country: tCountry,
  match: match,
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  region: tRegion,
};

export type tContainerProps = {
  country: tCountry,
  getCountry: (params: tDirectoryParams) => tThunk<tCountry>,
  getRegion: (params: tDirectoryParams) => tThunk<tRegion>,
  isLoading: boolean,
  match: match,
  region: tRegion,
};

export type tStore = {
  country: tThunk<tCountry>,
  region: tThunk<tRegion>,
};
