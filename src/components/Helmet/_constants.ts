import {spacesUrl} from '~app/constants';

// default meta and link tags that then get merged with route specific ones
export const LINK_TAGS: tLinkProps[] = [
  { rel: 'manifest', href: '/manifest.json' },
  {
    rel: 'apple-touch-icon',
    href: '/apple-touch-icon.png',
  },
  {
    rel: 'icon',
    href: '/favicon.ico',
  },
  {
    rel: 'icon',
    href: '/favicon-32x32.png',
    type: 'image/png',
  },
  {
    rel: 'icon',
    href: '/favicon.ico',
    type: 'image/ico',
  },
  {
    rel: 'preconnect',
    href: spacesUrl,
  },
  {
    crossOrigin: '',
    rel: 'preload',
    href: '/fonts/founders-grotesk-text-web-medium.woff2',
    as: 'font',
    type: 'font/woff2',
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
  {
    name: 'theme-color',
    content: '#fff',
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
  //   content: '@consensus',
  // },
];
