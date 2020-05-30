export type tPostRSVPServerQuery = {
  meetingId: string,
  type: 'public' | 'private',
  value: ts.rsvpEnum,
};
