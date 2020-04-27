namespace ts {
  declare type categorySlug = 'community'
    | 'cooperative'
    | 'political'
    | 'union';

  declare type category = 'Community'
    | 'Cooperative'
    | 'Political'
    | 'Union'
    | ''; // entering a category isn't required, just heavily encouraged

  declare type categoryMap = Readonly<{
    [key: string]: ts.category,
  }>;

  declare type categoryObj = Readonly<{
    display: ts.category,
    slug: categorySlug,
  }>;

  declare type categoryParams = ts.paginateParams & Readonly<{
    category: categorySlug,
  }>;
}
