declare interface tCountry {
  code: string, // us
  id: number,
  name: string, // United States
  regions?: tRegion[],
  regionType: 'state'|'province'|'prefecture';
}

declare interface tRegion extends tCountry {
  cities?: tCity[],
  country: number, // country.id
}

declare interface tCity extends tRegion {
  orgs: tOrg[],
  region: number, // region.id
}

// for now, org lives here
declare type tGate = 'public' | 'manual' | 'invite';

declare interface tOrg {
  category: string,
  city: string,
  cityId: number,
  country: string,
  countryId: number,
  createdAt?: string, // we dont send to client
  description: string,
  email?: string, // user admin account only
  eventPrivacy: tGate,
  gate: tGate,
  id: number,
  name: string,
  slug: string,
  region: string,
  regionId: number,
  updatedAt?: string, // we dont send to client
}
