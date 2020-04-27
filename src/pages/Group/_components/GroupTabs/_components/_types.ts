

export type tProps = ts.mediaContext & {
  match: ts.match & {params: ts.groupRouteParams},
  role?: ts.role,
  subRoute: '' | 'planMeeting' | 'drafts' | 'meetings' | 'pending' | 'members',
};
