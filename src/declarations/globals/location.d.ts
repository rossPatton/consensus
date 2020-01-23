declare type tPaginateParams = {
  readonly page?: string,
}

declare type tCategoryParams = tPaginateParams & {
  readonly category: tCategorySlug,
}

declare type tDirectoryParams = tPaginateParams & {
  readonly city?: string,
  readonly country?: string,
  readonly region?: string,
}

declare type tEventParams = {
  readonly id: number,
}

declare type tOrgRouteParams = tPaginateParams & {
  readonly id: string,
  readonly section?: string,
  readonly slug: string,
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
