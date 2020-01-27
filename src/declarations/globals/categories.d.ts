declare type tCategorySlug = 'community-center'
  | 'cooperative'
  | 'political-organization'
  | 'religious'
  | 'union';

declare type tCategory = 'Community Center'
  | 'Cooperative'
  | 'Political Organization'
  | 'Religious'
  | 'Union'
  | ''; // entering a category isn't required, just heavily encouraged

declare type tCategoryMap = {
  readonly [key: string]: tCategory,
};

declare type tCategories = {
  readonly display: tCategory,
  readonly slug: tCategorySlug,
}[];

declare type tCategoryParams = tPaginateParams & {
  readonly category: tCategorySlug,
}
