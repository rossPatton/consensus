// TODO need to rethink how to split up event types
// creating an event, event schema in db, not logged in event
declare type tEvent = {
  readonly attendees?: tUser[],
  readonly city: string,
  readonly country: string,
  readonly date: string,
  readonly description: string,
  readonly endDate: string,
  readonly id: number,
  readonly isDraft: boolean,
  readonly isPrivate: boolean,
  readonly location: string,
  readonly locationLink: string,
  readonly name: string,
  readonly orgId: number,
  readonly orgName: string,
  readonly publicRSVPS: number,
  readonly privateRSVPS: number,
  readonly rsvp: boolean,
  readonly slug: string,
  readonly state: string,
  readonly title: string,
}
