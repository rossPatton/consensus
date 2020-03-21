declare type tPrivacyEnum = 'public' | 'private' | 'hidden';

declare type tGroup = Readonly<{
   allowNonVerified: boolean,
   category: tCategory,
   city: string,
   cityId: number,
   country: string,
   countryId: number,
   created_at?: Date,
   description: string,
   // lives in accounts_emails table
   emails?: string[],
   facebook: string,
   id: number,
   memberName: string,
   modName: string,
   name: string,
   region: string,
   regionId: number,
   handle: string,
   updated_at?: Date,
   type: tPrivacyEnum,
   twitter: string,
   website: string,
}>;

// if posting/patching most values are up for grabs
declare type tGroupQuery = Partial<tGroup> & tFormSubmit;

// if getting, add db delimiters
declare type tGetGroupQuery = Partial<tGroup> & tBaseQuery;

declare type tGroupRouteParams = tPaginateParams & Readonly<{
   id: string,
   section?: 'planMeeting' | 'drafts' | 'members' | 'pending',
   slug: string,
}>;
