import { match } from 'react-router';

export type tStore = {
  event: tThunk<tEvent>,
  eventsByOrgId: tThunk<tEvent[]>,
  isLoading: boolean,
  session: tThunk<tSession>
}

export type tProps = {
  eventsByOrgId: tEvent[],
  match: match & { params: tEventParams },
};

export type tComponentProps = tProps & {
  event: tEvent,
};

export type tContainerProps = tProps & {
  getEventDispatch: (query: tGetEventQuery) => tThunkPayload<tEvent>,
  getEventsByOrgIdDispatch: (query: tGetEventQuery) => tThunkPayload<tEvent[]>,
  event: tThunk<tEvent>,
  isLoading: boolean,
  session: tSession,
}

