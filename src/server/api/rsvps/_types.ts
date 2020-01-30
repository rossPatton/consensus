export type tPostRSVPServerQuery = {
  eventId: string,
  isFormSubmit?: boolean,
  rsvpType: 'public' | 'private',
  value: 'true' | 'false',
};
