import { match } from 'react-router-dom';

export type tProps = {
  city: tCity,
  country: tCountry,
  match: match & {params: tDirectoryParams},
  region: tRegion,
};

export type tContainerProps = tProps & {
  getCity: (params: tDirectoryParams) => tThunk<tCity>,
  getCountry: (params: tDirectoryParams) => tThunk<tCountry>,
  getRegion: (params: tDirectoryParams) => tThunk<tRegion>,
  isLoading: boolean,
};

export type tStore = {
  city: tThunk<tCity>,
  country: tThunk<tCountry>,
  region: tThunk<tRegion>,
};
