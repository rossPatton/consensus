import loadable from '@loadable/component';

const PrivacyComponent = loadable(() =>
  import(/* webpackChunkName: "Privacy Policy" */'~app/pages/Privacy'),
);

export const Privacy = {
  component: PrivacyComponent,
  exact: true,
  path: '/privacy-policy',
};
