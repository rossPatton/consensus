import loadable from '@loadable/component';

export const AppShell = loadable(() =>
  import(/* webpackChunkName: "AppShell" */'./AppShell'),
);

export const ErrorBoundary = loadable(() =>
  import(/* webpackChunkName: "ErrorBoundary" */'./ErrorBoundary'),
);

export const GenericLoader = loadable(() =>
  import(/* webpackChunkName: "GenericLoader" */'./GenericLoader'),
);

export const Paginate = loadable(() =>
  import(/* webpackChunkName: "Paginate" */'./Paginate'),
);

export const PublishedFilter = loadable(() =>
  import(/* webpackChunkName: "PublishedFilter" */'./PublishedFilter'),
);

export const PrivacyFilter = loadable(() =>
  import(/* webpackChunkName: "PrivacyFilter" */'./PrivacyFilter'),
);

export const RoleFilter = loadable(() =>
  import(/* webpackChunkName: "RoleFilter" */'./RoleFilter'),
);

export const SearchFilter = loadable(() =>
  import(/* webpackChunkName: "SearchFilter" */'./SearchFilter'),
);
