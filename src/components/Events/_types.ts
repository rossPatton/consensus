import {match} from 'react-router';

type tProps = {
  events: tEvent[],
  role?: tRole,
  rsvps: tRSVP[],
  // render mobile/sidebar version
  tiny?: boolean,
};

export type tStore = {
  rsvps: tThunk<tRSVP[]>,
  session: tThunk<tSession>,
};

export type tContainerProps = tProps & {
  deleteEventDispatch: (query: tIdQuery) => tThunkPayload,
  getRsvpsDispatch: () => tThunkPayload<tRSVP[]>,
  match: match & {params: tPaginateParams},
  session: tSession,
};

export type tComponentProps = tProps & {
  deleteEvent: (ev: React.MouseEvent, id: number) => void,
  // if user is an admin, they can edit events
  isEditable?: boolean,
};


