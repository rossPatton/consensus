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

declare type tCategoryMap = Readonly<{
   [key: string]: tCategory,
}>;

declare type tCategoryObj = Readonly<{
   display: tCategory,
   slug: tCategorySlug,
}>;

declare type tCategoryParams = tPaginateParams & Readonly<{
   category: tCategorySlug,
}>;
