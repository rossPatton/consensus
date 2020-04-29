// default meta and link tags that then get merged with route specific ones
export const LINK_TAGS: tLinkProps[] = [
  { rel: 'manifest', href: '/static/manifest.json?v=asdf' },
  {
    rel: 'apple-touch-icon',
    href: '/static/apple-touch-icon.png?v=asdfsf',
  },
  {
    rel: 'icon',
    href: '/static/favicon.ico?v=asdfsad',
  },
  {
    rel: 'icon',
    href: '/static/favicon-32x32.png?v=asd',
    type: 'image/png',
  },
  {
    rel: 'icon',
    href: '/static/favicon.ico?v=1asdfasdf',
    type: 'image/ico',
  },
];

export const META_TAGS: tMetaProps[] = [
  {
    httpEquiv: 'content-type',
    content: 'text/html',
    charSet: 'utf-8',
  },
  {
    httpEquiv: 'X-UA-Compatible',
    content: 'IE=edge',
  },
  {
    httpEquiv: 'content-language',
    content: 'en-us',
  },
  {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1 minimum-scale=1',
  },
  { name: 'application-name', content: 'Consensus.com' },
  // { name: 'msapplication-square70x70logo', content: 'small.jpg' },
  // { name: 'msapplication-square150x150logo', content: 'medium.jpg' },
  // { name: 'msapplication-square310x150logo', content: 'wide.jpg' },
  // { name: 'msapplication-square310x310logo', content: 'large.jpg' },
  // { name: 'msapplication-TileColor', content: '#990000' },
  { name: 'apple-mobile-web-app-capable', content: 'yes' },
  {
    property: 'og:locale',
    content: 'en_US',
  },
  {
    property: 'og:site_name',
    content: 'Consensus',
  },
  // {
  //   property: 'og:image',
  //   content: '',
  // },
  // {
  //   property: 'og:image:width',
  //   content: '1200',
  // },
  // {
  //   property: 'og:image:height',
  //   content: '1200',
  // },
  {
    property: 'og:type',
    content: 'website',
  },
  // {
  //   property: 'twitter:card',
  //   content: 'summary',
  // },
  // {
  //   property: 'twitter:site',
  //   content: '@iodine',
  // },
  // {
  //   property: 'twitter:creator',
  //   content: '@iodine',
  // },
];
