namespace ts {
  declare type paginateParams = Readonly<{
    page?: string,
  }>;

  declare type breadcrumb = Readonly<{
    display: string,
    to: string,
  }>;

  declare type route = Readonly<{
    component: React.ReactComponentElement, // React.ReactNode ideally
    exact?: boolean,
    path: string | string[],
    private?: boolean,
    redirect?: string,
  }>;

  declare type meetingParams = Readonly<{
    id: string,
    slug: string,
  }>;

  // if possible, we try to get the user's location
  // if the user is not logged in, or if they haven't provided a location themselves
  declare type geo = Readonly<{
    city: string,
    countryCode: string,
    handle: string,
    postcode: number,
    region: string,
    regionCode: string,
  }>;

  declare type postcode = Readonly<{
    city: string,
    cityId: number,
    id: number,
    postcode: number,
  }>;
}
