export type tPostRSVPServerQuery = tFormSubmit & {
  eventId: string,
  rsvpType: 'public' | 'private',
  value: 'true' | 'false',
};
