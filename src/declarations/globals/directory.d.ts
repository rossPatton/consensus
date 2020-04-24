declare type tCountry = Readonly<{
   code: string, // us
   id: number,
   name: string, // United States
   regions?: tRegion[],
   regionType: 'state'|'province'|'prefecture';
}>;

declare type tRegion = Readonly<{
   cities?: tCity[],
   code: string,
   country: string,
   countryId: number,
   id: number,
   name: string, // United States
}>;

declare type tCity = Readonly<{
   countryId: number,
   country: string,
   id: number,
   name: string, // United States
   group: tGroup[],
   postcodes: number[],
   region: string,
   regionId: number,
}>;

declare type tDirectoryParams = tPaginateParams & Readonly<{
  city?: string,
  countryCode: string,
  regionCode?: string,
}>;
