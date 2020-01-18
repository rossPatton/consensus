import {match} from 'react-router';

export type tProps = {
  events: tEvent[],
  role?: tRole,
  // render mobile/sidebar version
  tiny?: boolean,
};

export interface tContainerProps extends tProps {
  deleteEvent: (query: tIdQuery) => Promise<tThunk<any>>,
  match: match & {params: tPaginateParams},
}

export interface tComponentProps extends tProps {
  deleteEvent: (ev: React.MouseEvent, id: number) => void,
  // if user is an admin, they can edit events
  isEditable?: boolean,
}


