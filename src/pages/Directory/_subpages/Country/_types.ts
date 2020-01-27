import { match } from 'react-router-dom';

export type tState = {
  regionsBySearch: tRegion[],
};

export type tStore = {
  country: tThunk<tCountry>,
  isLoading: boolean,
};

export type tProps = {
  match: match & {params: tDirectoryParams},
};

export type tComponentProps = tProps & {
  country: tCountry,
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  regionsToRender: tRegion[],
};

export type tContainerProps = tStore & tProps & {
  getCountry: (params: tDirectoryParams) => tThunk<tCountry>,
};
