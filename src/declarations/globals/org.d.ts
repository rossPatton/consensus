declare type tPrivacyEnum = 'public' | 'private' | 'invite';

declare type tOrg = Readonly<{
   category: tCategory,
   city: string,
   cityId: number,
   country: string,
   countryId: number,
   created_at?: Date,
   description: string,
   id: number,
   name: string,
   region: string,
   regionId: number,
   handle: string,
   updated_at?: Date,
   type: tPrivacyEnum,
}>;

// if posting/patching most values are up for grabs
declare type tOrgQuery = Partial<tOrg>;

// if getting, add db delimiters
declare type tGetOrgQuery = Partial<tOrg> & tBaseQuery;

declare type tOrgRouteParams = tPaginateParams & Readonly<{
   id: string,
   section?: 'planMeeting' | 'drafts' | 'members' | 'pending',
   slug: string,
}>;
