// search query vs query strings
declare type tSearchParams = tPaginateParams & Readonly<{
  value: string,
}>;

// search query via direct api call
declare type tSearchQuery = ReadOnly<{
  key: string, // key to search against
  value: string, // value we're looking for
}>;
