declare type tCategorySlug = 'community-center'
  | 'cooperative'
  | 'political-organization'
  | 'religious'
  | 'union';

declare type tCategory = 'Community Center'
  | 'Cooperative'
  | 'Political Organization'
  | 'Religious'
  | 'Union';

declare type tCategoryMap = {
  readonly [key: string]: tCategory,
};

declare type tCategories = {
  readonly display: tCategory,
  readonly slug: tCategorySlug,
}[];
