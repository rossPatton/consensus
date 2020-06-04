namespace ts {
  declare type privacyEnum = 'public' | 'private' | 'hidden';

  declare type group = ts.baseAccount & Readonly<{
    category: ts.category,
    description: string,
    deletionDeadline: string,
    handle: string,
    memberName: string,
    modName: string,
    name: string,
    type: ts.privacyEnum,
  }>;

  // if posting/patching most values are up for grabs
  declare type groupUpsertQuery = Partial<ts.group>;

  // if getting, add db delimiters
  declare type getGroupQuery = Partial<ts.group> & ts.baseQuery;

  declare type groupRouteParams = ts.paginateParams & Readonly<{
    idOrSlug: string,
    section?: 'planMeeting' | 'drafts' | 'members' | 'pending' | 'meetings',
    slug: string,
  }>;
}
