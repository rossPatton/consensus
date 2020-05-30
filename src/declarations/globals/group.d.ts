namespace ts {
  declare type privacyEnum = 'public' | 'private' | 'hidden';

  declare type group = Readonly<{
    allowNonVerified: boolean,
    avatar: string,
    category: ts.category,
    city: string,
    cityId: number,
    country: string,
    countryId: number,
    created_at?: Date,
    description: string,
    // lives in accounts table,
    // but we merge into group when rendering user pages
    email?: string,
    facebook?: string,
    id: number,
    memberName: string,
    modName: string,
    name: string,
    region: string,
    regionId: number,
    handle: string,
    updated_at?: Date,
    type: ts.privacyEnum,
    twitter?: string,
    website?: string,
  }>;

  // if posting/patching most values are up for grabs
  declare type groupUpsertQuery = Partial<ts.group> & {
    login?: string, // if posting (new group)
    password: string,
  };

  // if getting, add db delimiters
  declare type getGroupQuery = Partial<ts.group> & ts.baseQuery;

  declare type groupRouteParams = ts.paginateParams & Readonly<{
    idOrSlug: string,
    section?: 'planMeeting' | 'drafts' | 'members' | 'pending' | 'meetings',
    slug: string,
  }>;
}
