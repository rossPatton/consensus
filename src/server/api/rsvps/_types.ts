export type tPostRSVPServerQuery = tFormSubmit & {
  meetingId: string,
  type: 'public' | 'private',
  value: tRSVPValue,
};
