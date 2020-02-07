// TODO need to rethink how to split up event types
// creating an event, event schema in db, not logged in event
declare type tEvent = Readonly<{
   attendees?: tUser[],
   date: string,
   description: string,
   endDate: string,
   id: number,
   isDraft: boolean,
   isPrivate: boolean,
   location: string,
   locationLink: string,
   name: string,
   orgId: number,
   orgName: string,
   publicRSVPS: number,
   privateRSVPS: number,
   rsvp: boolean,
   slug: string,
   title: string,
}>;

// when posting or patching, we can potentially change just about everything
declare type tUpsertEventQuery = Partial<tEvent>;

// the params available to get are more expansive than posting/patching
declare type tGetEventQuery = Partial<tEvent> & tBaseQuery & Readonly<{
  isDraft?: boolean,
  isPublic?: boolean,
  showPast?: boolean,
}>;

declare type tEventParams = Readonly<{
   id: number,
}>;
