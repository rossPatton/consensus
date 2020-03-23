import { Location } from 'history';

export type tState = {
  category: tCategory,
  city: string,
  cityId: number,
  citySearch: string,
  handle: string,
  login: string,
  name: string,
  password: string,
  region: string
  regionId: number,
  type: tPrivacyEnum,
};

export type tStateUnion = keyof tState;
export type tEventTypes = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export type tContainerProps = {
  citiesThunk: tThunk<tCity[]>,
  geo: tGeo,
  getCitiesDispatch: (query?: {region: string}) => tThunkPayload<tCity[]>,
  location: Location,
  postGroupDispatch: (query: tGroupQuery) => tThunkPayload<tGroup>,
};

export type tComponentProps = tState & tSearchFilterProps & {
  disabled: boolean,
  onSubmit: (ev: React.FormEvent<HTMLFormElement>) => void,
  updateState: (stateKey: tStateUnion, value: string | number | object) => void,
};
