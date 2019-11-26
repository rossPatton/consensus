import {Location} from 'history';

export type tState = {
  deadline: string,
  description: string,
  id?: number,
  isDraft: boolean,
  isPrivate: boolean,
  newOption: string,
  options: string[],
  orgName: string,
  title: string,
  type: tDecisionType,
};

export type tStore = {
  decisions: tThunk<tDecision[]>,
  session: tThunk<tSession>,
};

export type tStateUnion = keyof tState;
export type tEventTypes = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export type tCreateDecision = {
  deadline: string,
  description: string,
  isDraft: boolean,
  isPrivate: boolean,
  options: any[],
  orgId: number,
  title: string,
  type: tDecisionType,
};

export type tContainerProps = {
  decisions: tDecision[],
  org: tOrg,
  postDecision: (decision: tCreateDecision) => Promise<{payload: tDecision}>,
  router: Location,
  session: tSession,
};

export type tComponentProps = tContainerProps & tState & {
  onSubmit: (ev: React.MouseEvent<HTMLButtonElement>) => void,
  removeOption: (option: string) => void,
  saveAsDraft: (ev: React.MouseEvent<HTMLButtonElement>) => void,
  toggleChecked: () => void,
  updateState: (stateKey: tStateUnion, value: any) => void,
};
