import loadable from '@loadable/component';

export const AppShell = loadable(() =>
  import(/* webpackChunkName: "AppShell" */'./AppShell'),
);

export const ErrorBoundary = loadable(() =>
  import(/* webpackChunkName: "ErrorBoundary" */'./ErrorBoundary'),
);

export const Paginate = loadable(() =>
  import(/* webpackChunkName: "Paginate" */'./Paginate'),
);

export const Search = loadable(() =>
  import(/* webpackChunkName: "Search" */'./Search'),
);
