import { Location } from 'history';

export type tState = {
  category: tCategory,
  city: string,
  cityId: number,
  country: string,
  countryId: number,
  description: string,
  email: string,
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
  location: Location,
  postOrg: (query: tOrgQuery) => any,
};

export type tComponentProps = tState & {
  onSubmit: (ev: React.FormEvent<HTMLFormElement>) => void,
  updateState: (stateKey: tStateUnion, ev: React.ChangeEvent<any>) => void,
};
