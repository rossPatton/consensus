import { Location } from 'history';

export type tState = {
  category: ts.category,
  city: string,
  cityId: number,
  email: string,
  handle: string,
  hasMounted: boolean,
  login: string,
  name: string,
  password: string,
  region: string
  regionId: number,
  showRegionField: boolean,
  type: ts.privacyEnum,
};

export type tStateUnion = keyof tState;
export type tMeetingTypes = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export type tContainerProps = {
  geo: ts.geo,
  location: Location,
  loginDispatch: (query: ts.loginQuery) => ts.thunkPayload<ts.roleMap>,
  postGroupDispatch: (query: ts.groupQuery) => ts.thunkPayload<ts.group>,
};

export type tComponentProps = tState & {
  disabled: boolean,
  geo: ts.geo,
  onSubmit: (ev: React.FormEvent<HTMLFormElement>) => void,
  updateState: (stateKey: tStateUnion, value: string | number | object | boolean) => void,
};
