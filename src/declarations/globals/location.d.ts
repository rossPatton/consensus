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
