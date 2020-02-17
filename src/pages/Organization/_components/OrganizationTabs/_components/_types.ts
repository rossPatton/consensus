import { match } from 'react-router';

export type tProps = {
  match: match & {params: tOrgRouteParams},
  role?: tRole,
  subRoute: '' | 'planMeeting' | 'drafts' | 'events' | 'pending',
};
