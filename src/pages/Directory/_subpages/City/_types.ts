import { match } from 'react-router-dom';

export type tProps = {
  city: tCity,
  country: tCountry,
  match: match & {params: tDirectoryParams},
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  orgsToRender: tOrg[],
  region: tRegion,
};

export type tContainerProps = {
  city: tCity,
  country: tCountry,
  getCity: (params: tDirectoryParams) => tThunk<tCity>,
  getCountry: (params: tDirectoryParams) => tThunk<tCountry>,
  getRegion: (params: tDirectoryParams) => tThunk<tRegion>,
  isLoading: boolean,
  match: match & {params: tDirectoryParams},
region: tRegion,
};

export type tStore = {
  city: tThunk<tCity>,
  country: tThunk<tCountry>,
  region: tThunk<tRegion>,
};
