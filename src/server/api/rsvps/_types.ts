export type tPostRSVPServerQuery = tFormSubmit & {
  eventId: string,
  type: 'public' | 'private',
  value: tRSVPValue,
};
