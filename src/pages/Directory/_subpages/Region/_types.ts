import { match } from 'react-router-dom';

export type tProps = {
  country: tCountry,
  match: match,
  region: tRegion,
};

export type tContainerProps = tProps & {
  country: tCountry,
  getCountry: (params: tLocationParams) => tThunk<tCountry>,
  getRegion: (params: tLocationParams) => tThunk<tRegion>,
  isLoading: boolean,
  match: match,
  region: tRegion,
};

export type tStore = {
  country: tThunk<tCountry>,
  region: tThunk<tRegion>,
};
