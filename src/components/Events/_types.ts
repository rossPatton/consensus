import {match} from 'react-router';

type tProps = {
  events: tEvent[],
  role?: tRole,
  // render mobile/sidebar version
  tiny?: boolean,
};

export type tStore = {
  session: tThunk<tSession>,
};

export type tContainerProps = tProps & {
  deleteEventDispatch: (query: tIdQuery) => tThunkPayload,
  match: match & {params: tPaginateParams},
  session: tSession,
};

export type tComponentProps = tProps & {
  deleteEvent: (ev: React.MouseEvent, id: number) => void,
  // if user is an admin, they can edit events
  isEditable?: boolean,
};


