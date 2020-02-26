declare type tCategorySlug = 'community'
  | 'cooperative'
  | 'political'
  | 'union';

declare type tCategory = 'Community'
  | 'Cooperative'
  | 'Political'
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
