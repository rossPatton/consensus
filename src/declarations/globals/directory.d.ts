declare type tCountry = Readonly<{
   code: string, // us
   id: number,
   name: string, // United States
   regions?: tRegion[],
   regionType: 'state'|'province'|'prefecture';
}>;

declare type tRegion = tCountry & Readonly<{
   cities?: tCity[],
   code: string,
   countryId: number,
   country: string,
}>;

declare type tCity = tRegion & Readonly<{
   orgs: tGroup[],
   postcodes: number[],
   region: string,
   regionId: 2,
}>;

declare type tDirectoryParams = tPaginateParams & Readonly<{
   city?: string,
   countryCode: string,
   regionCode?: string,
}>;
