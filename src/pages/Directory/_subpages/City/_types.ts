import { match } from 'react-router-dom';

export type tState = {
  category: tCategory,
  orgsBySearch: tGroup[],
};

export type tStore = {
  city: tThunk<tCity>,
  region: tThunk<tRegion>,
};

export type tProps = {
  match: match & {params: tDirectoryParams},
};

export type tComponentProps = tProps & {
  category: tCategory,
  city: tCity,
  onChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  onSearch: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  orgsToRender: tGroup[],
};

export type tContainerProps = tProps & {
  city: tThunk<tCity>,
  getCity: (params: tDirectoryParams) => tThunk<tCity>,
  getRegion: (params: tDirectoryParams) => tThunk<tRegion>,
  isCityLoading: boolean,
  isRegionLoading: boolean,
  region: tRegion,
};
