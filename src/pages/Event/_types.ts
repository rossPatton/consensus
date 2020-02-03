import { match } from 'react-router';

export type tStore = {
  event: tThunk<tEvent>,
  eventsByOrgId: tThunk<tEvent[]>,
  isLoading: boolean,
  rsvps: tThunk<tRSVP[]>,
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
  event: tThunk<tEvent>,
  getEventDispatch: (query: tIdQuery) => tThunkPayload<tEvent>,
  getEventsByOrgIdDispatch: (query: tGetEventQuery) => tThunkPayload<tEvent[]>,
  getRsvpsDispatch: () => tThunkPayload<tRSVP[]>,
  isLoading: boolean,
  rsvpsThunk: tThunk<tRSVP[]>,
  session: tSession,
}

