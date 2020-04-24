import { Location } from 'history';

export type tState = {
  category: tCategory,
  city: string,
  cityId: number,
  handle: string,
  hasMounted: boolean,
  login: string,
  name: string,
  password: string,
  region: string
  regionId: number,
  showRegionField: boolean,
  type: tPrivacyEnum,
};

export type tStateUnion = keyof tState;
export type tMeetingTypes = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export type tContainerProps = {
  geo: tGeo,
  location: Location,
  loginDispatch: (query: tLoginQuery) => tThunkPayload<tAccount>,
  postGroupDispatch: (query: tGroupQuery) => tThunkPayload<tGroup>,
};

export type tComponentProps = tState & {
  disabled: boolean,
  geo: tGeo,
  onSubmit: (ev: React.FormEvent<HTMLFormElement>) => void,
  updateState: (stateKey: tStateUnion, value: string | number | object | boolean) => void,
};
