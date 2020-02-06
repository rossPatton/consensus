declare type tPaginateParams = {
  readonly page?: string,
}

declare type tCrumb = {
  readonly display: string,
  readonly to: string,
};

declare type tRoute = {
  readonly component: React.ReactComponentElement, // React.ReactNode ideally
  readonly exact?: boolean,
  readonly path: string,
  readonly private?: boolean,
  readonly redirect?: string,
};

declare type tSearchParams = tPaginateParams & {
  readonly value: string,
}

// if possible, we try to get the user's location
// if the user is not logged in, or if they haven't provided a location themselves
declare type tGeo = {
  city: string,
  postcode: number,
};
