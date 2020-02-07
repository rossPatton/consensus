declare type tPrivacyEnum = 'public' | 'manual' | 'private';

declare type tOrg = Readonly<{
   category: tCategory,
   city: string,
   cityId: number,
   country: string,
   countryId: number,
   created_at?: Date,
   description: string,
   eventPrivacy: tPrivacyEnum,
   id: number,
   name: string,
   region: string,
   regionId: number,
   slug: string,
   updated_at?: Date,
   vetting: tPrivacyEnum,
}>;

// if posting/patching most values are up for grabs
declare type tOrgQuery = Partial<tOrg>;

// if getting, add db delimiters
declare type tGetOrgQuery = Partial<tOrg> & tBaseQuery;

declare type tOrgRouteParams = tPaginateParams & Readonly<{
   id: string,
   section?: string,
   slug: string,
}>;
