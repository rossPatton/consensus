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

declare type tSearchParams = tPaginateParams & Readonly<{
   value: string,
}>;

// if possible, we try to get the user's location
// if the user is not logged in, or if they haven't provided a location themselves
declare type tGeo = Readonly<{
  city: string,
  handle: string,
  state: string,
  postcode: number,
}>;
