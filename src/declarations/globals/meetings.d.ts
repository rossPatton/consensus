namespace ts {
  declare type meeting = Readonly<{
    attendees?: number,
    category: ts.category,
    date: string,
    description: string,
    endDate: string,
    groupId: number,
    groupName: string,
    host: string,
    id: number,
    img?: string,
    isDraft: boolean,
    isOnline: boolean,
    isPrivate: boolean,
    location: string,
    locationLink: string,
    publicRSVPS?: ts.user[],
    slug: string,
    tag: meetingTypes,
    title: string,
  }>;

  // if looking at a single meeting page, we pull in a few extra things
  declare type meetingSingular = ts.meeting & Readonly<{
    rsvp: tRVSP,
  }>;

  // when posting or patching, we can potentially change just about everything
  declare type upsertMeetingQuery = Partial<ts.meetingSingular>;

  // the params available to get are more expansive than posting/patching
  declare type getMeetingQuery = Partial<ts.meetingSingular> & ts.baseQuery & Readonly<{
    isDraft?: boolean,
    isPrivate?: boolean,
    role?: ts.role,
    showPast?: boolean,
  }>;

  declare type meetingsByLocationQuery = Readonly<{
    name?: string, // city name
    id?: number,
    regionCode?: string,
  }>;

  declare type meetingTypes = 'Meeting'
    | 'March'
    | 'Rally'
    | 'Direct Action'
    | 'Protest'
    | 'Strike'
    | 'Picket'
    | 'Vote'
    | 'Election';
}
