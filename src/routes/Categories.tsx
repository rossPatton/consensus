import loadable from '@loadable/component';

const CategoriesComponent = loadable(() =>
  import(/* webpackChunkName: "Categories" */'../pages/Categories'),
);

export const Categories = {
  component: CategoriesComponent,
  exact: true,
  path: '/categories/:category?/:page?',
};
