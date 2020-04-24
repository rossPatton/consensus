declare type tPaginateParams = Readonly<{
  page?: string,
}>;

declare type tCrumb = Readonly<{
  display: string,
  to: string,
}>;

declare type tRoute = Readonly<{
  component: React.ReactComponentElement, // React.ReactNode ideally
  exact?: boolean,
  path: string,
  private?: boolean,
  redirect?: string,
}>;

declare type tMeetingParams = Readonly<{
  idOrSlug: number | string,
}>;

// if possible, we try to get the user's location
// if the user is not logged in, or if they haven't provided a location themselves
declare type tGeo = Readonly<{
  city: string,
  countryCode: string,
  handle: string,
  postcode: number,
  region: string,
  regionCode: string,
}>;

declare type tPostCode = Readonly<{
  city: string,
  cityId: number,
  id: number,
  postcode: number,
}>;
