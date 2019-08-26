import { match } from 'react-router-dom';

export type tProps = {
  city: tCity,
  country: tCountry,
  match: match,
  region: tRegion,
};

export type tContainerProps = tProps & {
  getCity: (params: tLocationParams) => tThunk<tCity>,
  getCountry: (params: tLocationParams) => tThunk<tCountry>,
  getRegion: (params: tLocationParams) => tThunk<tRegion>,
  isLoading: boolean,
};

export type tStore = {
  city: tThunk<tCity>,
  country: tThunk<tCountry>,
  region: tThunk<tRegion>,
};
