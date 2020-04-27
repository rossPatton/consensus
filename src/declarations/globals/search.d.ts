namespace ts {
  // search query vs query strings
  declare type searchParams = ts.paginateParams & Readonly<{
    value: string,
  }>;

  // search query via direct api call
  declare type searchQuery = ReadOnly<{
    key: string, // key to search against
    value: string, // value we're looking for
  }>;
}
