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
