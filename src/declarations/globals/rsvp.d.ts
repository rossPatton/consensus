declare type tRSVPValue = 'yes' | 'no' | 'maybe' | '' | null;

declare type tRSVP = Readonly<{
  eventId: number,
  id?: number,
  type: 'public' | 'private',
  userId: number,
  value: tRSVPValue,
}>;

declare type tRSVPQuery = Readonly<{
  eventId: number,
  type: 'public' | 'private',
  value: tRSVPValue,
}>;
