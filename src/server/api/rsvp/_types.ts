// everything gets turned into strings
export type tMeetingsServerQuery = {
  meetingId: string,
  type: 'public' | 'private',
  value: 'true' | 'false',
};
