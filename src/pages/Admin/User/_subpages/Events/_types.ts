import {match} from 'react-router-dom';

export type tProps = {
  events: tEvent[],
};

export type tContainerProps = tProps & {
  match: match,
  getEventsByUser: () => void,
  session: tSession,
};
