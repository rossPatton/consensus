namespace ts {
  declare type meeting = Readonly<{
    category: ts.category,
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
  declare type meetingSingular = ts.meeting & Readonly<{
    attendees: ts.user[],
    publicRSVPS: number,
    privateRSVPS: number,
    rsvp: tRVSP,
  }>;

  // when posting or patching, we can potentially change just about everything
  declare type upsertMeetingQuery = Partial<ts.meetingSingular>;

  // the params available to get are more expansive than posting/patching
  declare type getMeetingQuery = Partial<ts.meetingSingular> & ts.baseQuery & Readonly<{
    isDraft?: boolean,
    isPrivate?: boolean,
    showPast?: boolean,
  }>;

  declare type meetingsByLocationQuery = Readonly<{
    // one or the other will be used, depending on whats passed in
    cityId?: number,
    name?: string,
    // same for the following
    regionCode?: string,
    regionId?: number,
  }>;
}
