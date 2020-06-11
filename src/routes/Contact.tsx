import loadable from '@loadable/component';

const ContactComponent = loadable(() =>
  import(/* webpackChunkName: "Contact" */'~app/pages/Contact'),
);

export const Contact = {
  component: ContactComponent,
  path: '/contact/:type?',
};
