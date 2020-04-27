namespace ts {
  declare type rsvpEnum = 'yes' | 'no' | 'maybe' | '' | null;

  declare type rsvp = Readonly<{
    meetingId: number,
    id?: number,
    type: 'public' | 'private',
    userId: number,
    value: ts.rsvpEnum,
  }>;

  declare type rsvpQuery = Readonly<{
    meetingId: number,
    type: 'public' | 'private',
    value: ts.rsvpEnum,
  }>;
}
