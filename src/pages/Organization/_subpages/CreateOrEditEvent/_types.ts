import {Location} from 'history';

export type tState = {
  category: string,
  date: string,
  description: string,
  duration: string | number, // string because that's what the form will give us
  // featuredImage: File | null,
  id?: number,
  // imagePreview: string | null,
  isDraft: boolean,
  isPrivate: boolean,
  location: string,
  locationLink: string,
  orgName: string,
  // pathToFeaturedImage: string | null,
  time: string,
  title: string,
};

export type tStore = {
  eventsByOrgId: tThunk<tEvent[]>,
  session: tThunk<tSession>,
};

export type tStateUnion = keyof tState;
export type tEventTypes = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export type tContainerProps = {
  events: tEvent[],
  org: tOrg,
  postEvent: (query: tPostEventQuery) => tThunkPayload<tEvent>,
  router: Location,
  session: tSession,
};

export type tComponentProps = tContainerProps & tState & {
  onSubmit: (ev: React.MouseEvent<HTMLButtonElement>) => void,
  saveAsDraft: (ev: React.MouseEvent<HTMLButtonElement>) => void,
  toggleChecked: () => void,
  updateState: (stateKey: tStateUnion, value: any) => void,
};
