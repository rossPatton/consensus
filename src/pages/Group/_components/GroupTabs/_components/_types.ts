import { match } from 'react-router';

export type tProps = tMediaContext & {
  match: match & {params: tGroupRouteParams},
  role?: ts.role,
  subRoute: '' | 'planMeeting' | 'drafts' | 'meetings' | 'pending' | 'members',
};
