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

declare let __HCAPTCHA_KEY__: string;
declare let __HCAPTCHA_SECRET__: string;

// build specific hash for cache, other stuff
declare let __HASH__: string;

// our mail server domain
declare let __MAIL_DOMAIN__: string;

// api key for mailgun
declare let __MAIL_KEY__: string;

// mailgun from field
declare let __MAIL_URL__: string;

// sandbox FROM mail address
declare let __MAIL_SANDBOX__: string;

// node environment
declare let __NODE_ENV__: 'development' | 'production';

// make sure qa urls dont get indexed by google
declare let __NOINDEX__: boolean;

// NODE_ENV === production
declare let __PROD__: boolean;

// koa app keys secret
declare let __SECRET__: string;

// code is running during a SSR
declare let __SERVER__: boolean;

// access key and secret needed to upload files to our digitalocean spaces bucket
declare let __SPACES_KEY__: string
declare let __SPACES_SECRET__: string

// consensus.local or consens.us.org depending on environment
declare let __URL__: 'https://consensus.local' | 'https://consens.us.org';
