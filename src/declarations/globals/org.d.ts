declare type tPrivacyEnum = 'public' | 'manual' | 'private';

declare type tOrg = {
  readonly category: tCategory,
  readonly city: string,
  readonly cityId: number,
  readonly country: string,
  readonly countryId: number,
  readonly createdAt?: Date,
  readonly description: string,
  readonly eventPrivacy: tPrivacyEnum,
  readonly id: number,
  readonly name: string,
  readonly region: string,
  readonly regionId: number,
  readonly slug: string,
  readonly updatedAt?: Date,
  readonly vetting: tPrivacyEnum,
};

// if posting/patching most values are up for grabs
declare type tOrgQuery = Partial<tOrg>;

// if getting, add db delimiters
declare type tGetOrgQuery = Partial<tOrg> & tBaseQuery;

declare type tOrgRouteParams = tPaginateParams & {
  readonly id: string,
  readonly section?: string,
  readonly slug: string,
}
