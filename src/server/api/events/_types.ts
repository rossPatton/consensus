// everything gets turned into strings
export type tEventsServerQuery = {
  date: string,
  exclude: string,
  id: string,
  isDraft: 'true' | 'false',
  isPublic: 'true' | 'false',
  limit: string
  offset: string
  orgId: string
  showPast: 'true' | 'false',
};
