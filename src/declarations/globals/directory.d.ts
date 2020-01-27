declare type tCountry = {
  readonly code: string, // us
  readonly id: number,
  readonly name: string, // United States
  readonly regions?: tRegion[],
  readonly regionType: 'state'|'province'|'prefecture';
}

declare type tRegion = tCountry & {
  readonly cities?: tCity[],
  readonly country: number, // country.id
}

declare type tCity = tRegion & {
  readonly orgs: tOrg[],
  readonly region: number, // region.id
}

declare type tDirectoryParams = tPaginateParams & {
  readonly city?: string,
  readonly country?: string,
  readonly region?: string,
}
