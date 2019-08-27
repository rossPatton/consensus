import { match } from 'react-router-dom';

export type tProps = {
  country: tCountry,
  match: match,
  region: tRegion,
};

export type tContainerProps = tProps & {
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
