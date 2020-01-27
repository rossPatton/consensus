declare type tGate = 'public' | 'manual' | 'invite';
declare type tEventPrivacy = 'public' | 'private' | 'manual';

declare type tOrg = {
  readonly category: tCategory,
  readonly city: string,
  readonly cityId: number,
  readonly country: string,
  readonly countryId: number,
  readonly description: string,
  readonly eventPrivacy: tEventPrivacy,
  readonly gate: tGate,
  readonly id: number,
  readonly name: string,
  readonly slug: string,
  readonly region: string,
  readonly regionId: number,
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
