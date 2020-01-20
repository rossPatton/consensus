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

// for now, org lives here
declare type tGate = 'public' | 'manual' | 'invite';

declare type tOrg = {
  readonly category: string,
  readonly city: string,
  readonly cityId: number,
  readonly country: string,
  readonly countryId: number,
  readonly createdAt?: string, // we dont send to client
  readonly description: string,
  readonly email?: string, // user admin account only
  readonly eventPrivacy: tGate,
  readonly gate: tGate,
  readonly id: number,
  readonly name: string,
  readonly slug: string,
  readonly region: string,
  readonly regionId: number,
  readonly updatedAt?: string, // we dont send to client
}
