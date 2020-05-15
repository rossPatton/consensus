declare module '*.css' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

// is on client (web browser)
declare let __CLIENT__: boolean;

// has set debug mode to true (slightly more output, kinda annoying actually)
declare let __DEBUG__: boolean;

// NODE_ENV === development
declare let __DEV__: boolean;

// build specific hash for cache, other stuff
declare let __HASH__: string;

// node environment
declare let __NODE_ENV__: 'development' | 'production';

// make sure qa urls dont get indexed by google
declare let __NOINDEX__;

// NODE_ENV === production
declare let __PROD__: boolean;

// koa app keys secret
declare let __SECRET__: string;

// code is running during a SSR
declare let __SERVER__: boolean;

// consensus.local or consens.us.org depending on environment
declare let __URL__: string;
