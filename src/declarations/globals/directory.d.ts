declare type tCountry = Readonly<{
   code: string, // us
   id: number,
   name: string, // United States
   regions?: tRegion[],
   regionType: 'state'|'province'|'prefecture';
}>;

declare type tRegion = tCountry & Readonly<{
   cities?: tCity[],
   country: number, // country.id
}>;

declare type tCity = tRegion & Readonly<{
   orgs: tOrg[],
   postcodes: number[],
   region: number, // region.id
}>;

declare type tDirectoryParams = tPaginateParams & Readonly<{
   city?: string,
   country?: string,
   region?: string,
}>;
