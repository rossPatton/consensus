// everything gets turned into strings
export type tEventsServerQuery = {
  eventId: string,
  type: 'public' | 'private',
  value: 'true' | 'false',
};
