import { match } from 'react-router-dom';

export type tProps = {
  country: tCountry,
  match: match,
};

export type tContainerProps = tProps & {
  getCountry: (params: tLocationParams) => tThunk<tCountry>,
  isLoading: boolean,
};

export type tStore = {
  country: tThunk<tCountry>,
};
