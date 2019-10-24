import { match } from 'react-router-dom';

export type tProps = {
  country: tCountry,
  match: match,
};

export type tComponentProps = tProps & {
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  regionsToRender: tRegion[],
};

export type tContainerProps = tProps & {
  getCountry: (params: tDirectoryParams) => tThunk<tCountry>,
  isLoading: boolean,
};

export type tState = {
  regionsBySearch: tRegion[],
};

export type tStore = {
  country: tThunk<tCountry>,
};
