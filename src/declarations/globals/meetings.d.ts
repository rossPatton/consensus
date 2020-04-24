declare type tMeeting = Readonly<{
  category: tCategory,
  date: string,
  description: string,
  endDate: string,
  id: number,
  isDraft: boolean,
  isPrivate: boolean,
  location: string,
  locationLink: string,
  groupId: number,
  groupName: string,
  publicRSVPS: number,
  privateRSVPS: number,
  slug: string,
  title: string,
}>;

// if looking at a single meeting page, we pull in a few extra things
declare type tMeetingSingular = tMeeting & Readonly<{
  attendees: tUser[],
  publicRSVPS: number,
  privateRSVPS: number,
  rsvp: tRVSP,
}>;

// when posting or patching, we can potentially change just about everything
declare type tUpsertMeetingQuery = Partial<tMeetingSingular>;

// the params available to get are more expansive than posting/patching
declare type tGetMeetingQuery = Partial<tMeetingSingular> & tBaseQuery & Readonly<{
  isDraft?: boolean,
  isPrivate?: boolean,
  showPast?: boolean,
}>;
