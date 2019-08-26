import { match } from 'react-router-dom';

export type tProps = {
  country: tCountry,
  getCountry: (params: tLocationParams) => tThunk<tCountry>,
  isLoading: boolean,
  match: match,
};

export type tStore = {
  country: tThunk<tCountry>,
};
