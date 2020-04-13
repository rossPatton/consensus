import { match } from 'react-router';

export type tProps = tMediaContext & {
  match: match & {params: tGroupRouteParams},
  role?: tRole,
  subRoute: '' | 'planMeeting' | 'drafts' | 'events' | 'pending' | 'members',
};
