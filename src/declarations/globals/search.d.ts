namespace ts {
  // search query via direct api call
  declare type searchKeyUnion = 'name' | 'category' | 'city' | 'region';

  // search programmatic api call
  declare type searchQuery = ReadOnly<{
    key: searchKeyUnion,
    value: string,
  }>;

  // search query with query strings in url
  declare type searchParams = ts.paginateParams & searchQuery;
}
