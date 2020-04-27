namespace ts {
  declare type country = Readonly<{
    code: string, // us
    id: number,
    name: string, // United States
    regions?: ts.region[],
    regionType: 'state'|'province'|'prefecture';
  }>;

  declare type region = Readonly<{
    cities?: ts.city[],
    code: string,
    country: string,
    countryId: number,
    id: number,
    name: string,
  }>;

  declare type city = Readonly<{
    countryId: number,
    country: string,
    id: number,
    name: string,
    group: ts.group[],
    postcodes: number[],
    region: string,
    regionId: number,
  }>;

  declare type directoryParams = ts.paginateParams & Readonly<{
    city?: string,
    countryCode: string,
    regionCode?: string,
  }>;
}
