declare interface tPaginateParams {
  readonly page?: string,
}

declare interface tCategoryParams extends tPaginateParams {
  readonly category: tCategorySlug,
}

declare interface tDirectoryParams extends tPaginateParams {
  readonly city?: string,
  readonly country?: string,
  readonly region?: string,
}

declare interface tEventParams {
  readonly id: number,
}

declare interface tOrgRouteParams extends tPaginateParams {
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

declare interface tSearchParams extends tPaginateParams {
  readonly value: string,
}
