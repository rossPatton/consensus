namespace ts {
  declare type privacyEnum = 'public' | 'private' | 'hidden';

  declare type group = Readonly<{
    avatar: string,
    category: ts.category,
    city: string,
    cityId: number,
    country: string,
    countryId: number,
    created_at?: Date,
    description: string,
    email: string,
    facebook?: string,
    handle: string,
    id: number,
    memberName: string,
    modName: string,
    name: string,
    region: string,
    regionId: number,
    showOnboarding: boolean,
    twitter?: string,
    type: ts.privacyEnum,
    updated_at?: Date,
    website?: string,
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
