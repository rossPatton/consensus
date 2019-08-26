import { match } from 'react-router-dom';

export type tProps = {
  city: tCity,
  country: tCountry,
  getCity: (params: tLocationParams) => tThunk<tCity>,
  getCountry: (params: tLocationParams) => tThunk<tCountry>,
  getRegion: (params: tLocationParams) => tThunk<tRegion>,
  match: match,
  region: tRegion,
};

export type tStore = {
  city: tThunk<tCity>,
  country: tThunk<tCountry>,
  region: tThunk<tRegion>,
};
