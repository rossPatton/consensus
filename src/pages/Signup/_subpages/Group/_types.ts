import { Location } from 'history';

export type tState = {
  category: ts.category,
  city: string,
  cityId: number,
  error: string,
  handle: string,
  name: string,
  region: string
  regionId: number,
  showRegionField: boolean,
  token: string,
  type: ts.privacyEnum,
};

export type tStateUnion = keyof tState;
export type tMeetingTypes = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

type tProps = ts.tokenProps & {
  geo: ts.geo,
  termsAccepted: boolean,
  toggleTerms: (termsAccepted: boolean) => void,
};

export type tContainerProps = tProps & {
  location: Location,
  loginDispatch: (query: ts.loginQuery) => ts.thunkPayload<ts.roleMap>,
  postGroupDispatch: (query: ts.groupUpsertQuery) => ts.thunkPayload<ts.group>,
};

export type tComponentProps = tProps & tState & {
  disabled: boolean,
  verifyAndRegister: () => void,
  updateState: (stateKey: tStateUnion, value: string | number | object | boolean) => void,
};
