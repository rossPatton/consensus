import {match} from 'react-router';

export type tStore = {
  session: tThunk<tSession>,
};

export type tStateUnion = keyof tOrg;
export type tEventTypes = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export type tContainerProps = {
  match: match & {params: {section: string}},
  org: tOrg,
  session: tSession,
};

export type tComponentProps = tOrg & {
  match: match & {params: {section: string}},
  onSubmit: (ev: React.FormEvent<HTMLFormElement>) => void,
  section: string,
  updateState: (stateKey: tStateUnion, ev: React.ChangeEvent<any>) => void,
};