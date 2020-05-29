namespace ts {
  declare type categorySlug = 'community'
    | 'cooperative'
    | 'political'
    | 'union';

  declare type category = 'Community'
    | 'Cooperative'
    | 'Political'
    | 'Union'
    | ''; // used to show all categories in filters, etc

  declare type categoryMap = Readonly<{
    [key: string]: ts.category,
  }>;

  declare type categoryObj = Readonly<{
    align: string,
    description: string,
    display: string,
    slug: categorySlug,
  }>;

  declare type categoryParams = ts.paginateParams & Readonly<{
    category: categorySlug,
  }>;
}
