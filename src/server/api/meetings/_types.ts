// everything gets turned into strings
export type tMeetingsServerQuery = {
  date: string,
  exclude: string,
  id: string,
  isDraft: 'true' | 'false',
  isPrivate: 'true' | 'false',
  limit: string
  offset: string
  groupId: string
  showPast: 'true' | 'false',
};
