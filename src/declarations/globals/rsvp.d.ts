declare type tRSVPValue = 'yes' | 'no' | 'maybe' | '' | null;

declare type tRSVP = Readonly<{
  meetingId: number,
  id?: number,
  type: 'public' | 'private',
  userId: number,
  value: tRSVPValue,
}>;

declare type tRSVPQuery = Readonly<{
  meetingId: number,
  type: 'public' | 'private',
  value: tRSVPValue,
}>;
