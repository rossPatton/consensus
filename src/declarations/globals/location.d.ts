declare interface tCategoryParams {
  category: tCategorySlug,
  page?: string,
}

declare interface tDirectoryParams {
  city?: string,
  country?: string,
  page?: string,
  region?: string,
}

declare interface tEventParams {
  id: number,
}

declare interface tOrgRouteParams {
  id: string,
  page?: string,
  section?: string,
  slug: string,
}

declare interface tPaginateParams {
  page?: string,
}

declare type tCrumb = {
  display: string,
  to: string,
};

declare interface tRoute {
  component: React.ReactComponentElement, // React.ReactNode ideally
  exact?: boolean,
  path: string,
  private?: boolean,
  redirect?: string,
};

declare interface tSearchParams {
  value: string,
}
