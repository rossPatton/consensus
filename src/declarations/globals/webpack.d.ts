declare module '*.css' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare let __DB_PW__: string;
declare let __DB__: 'development' | 'production';
declare let __CLIENT__: boolean;
declare let __DEBUG__: boolean;
declare let __HASH__: string;
declare let __DEV__: boolean;
declare let __PROD__: boolean;
declare let __NODE_ENV__: 'development' | 'production';
declare let __SECRET__: string;
declare let __SERVER__: boolean;
declare let __URL__: string;
