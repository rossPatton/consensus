export type tPostRSVPServerQuery = ts.formSubmit & {
  meetingId: string,
  type: 'public' | 'private',
  value: ts.rsvpEnum,
};
