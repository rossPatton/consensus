import loadable from '@loadable/component';

const TermsComponent = loadable(() =>
  import(/* webpackChunkName: "Terms And Conditions" */'~app/pages/Terms'),
);

export const Terms = {
  component: TermsComponent,
  exact: true,
  path: '/terms-and-conditions',
};
