import loadable from '@loadable/component';

export const CategoryList = loadable(() =>
  import(/* webpackChunkName: "CategoryList" */'./CategoryList'),
);

export const Category = loadable(() =>
  import(/* webpackChunkName: "Category" */'./Category'),
);
