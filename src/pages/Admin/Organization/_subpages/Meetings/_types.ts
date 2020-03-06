import {tAdminSections} from '../../../_types';

export type tProps = {
  match: tAdminSections,
};

export type tComponentProps = tProps
  & tPublishedFilterProps
  & tSearchFilterProps
  & {
  events: tEvent[],
};

export type tContainerProps = tProps & {
  eventsByOrgIdThunk: tThunk<tEvent[]>,
  getEventsByOrgIdDispatch: (query: tGetEventQuery) => tThunkPayload<tEvent[]>,
  sessionThunk: tThunk<tSession>,
};

export type tStore = {
  eventsByOrgId: tThunk<tEvent[]>,
  session: tThunk<tSession>,
};
