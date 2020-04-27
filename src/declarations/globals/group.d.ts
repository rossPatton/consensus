namespace ts {
  declare type privacyEnum = 'public' | 'private' | 'hidden';

  declare type group = Readonly<{
    allowNonVerified: boolean,
    avatarHash?: string,
    category: ts.category,
    city: string,
    cityId: number,
    country: string,
    countryId: number,
    created_at?: Date,
    description: string,
    // lives in accounts_emails table
    emails?: string[],
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
  declare type groupQuery = Partial<ts.group> & ts.formSubmit;

  // if getting, add db delimiters
  declare type getGroupQuery = Partial<ts.group> & ts.baseQuery;

  declare type groupRouteParams = ts.paginateParams & Readonly<{
    idOrSlug: string,
    section?: 'planMeeting' | 'drafts' | 'members' | 'pending' | 'meetings',
    slug: string,
  }>;
}
