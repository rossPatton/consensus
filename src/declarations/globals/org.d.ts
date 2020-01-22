declare type tGate = 'public' | 'manual' | 'invite';
declare type tEventPrivacy = 'public' | 'private' | 'manual';

declare type tOrg = {
  readonly category: tCategory,
  readonly city: string,
  readonly cityId: number,
  readonly country: string,
  readonly countryId: number,
  readonly createdAt?: string, // we dont send to client
  readonly description: string,
  readonly email?: string, // user admin account only
  readonly eventPrivacy: tEventPrivacy,
  readonly gate: tGate,
  readonly id: number,
  readonly name: string,
  readonly slug: string,
  readonly region: string,
  readonly regionId: number,
  readonly updatedAt?: string, // we dont send to client
}
