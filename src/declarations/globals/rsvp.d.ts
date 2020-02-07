declare type tRSVP = Readonly<{
  eventId: number,
  id?: number,
  // only one can be true at a time
  privateRSVP: boolean,
  publicRSVP: boolean,
  userId: number,
}>;

declare type tRSVPQuery = Readonly<{
  eventId: number,
  rsvpType: 'public' | 'private',
  value: boolean,
}>;
