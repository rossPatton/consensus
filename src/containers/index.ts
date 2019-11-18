import loadable from '@loadable/component';

export const AppShell = loadable(() =>
  import(/* webpackChunkName: "AppShell" */'./AppShell'),
);

export const DecisionTypeFilter = loadable(() =>
  import(/* webpackChunkName: "DecisionTypeFilter" */'./DecisionTypeFilter'),
);

export const ErrorBoundary = loadable(() =>
  import(/* webpackChunkName: "ErrorBoundary" */'./ErrorBoundary'),
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


export const Search = loadable(() =>
  import(/* webpackChunkName: "Search" */'./Search'),
);
