import loadable from '@loadable/component';

export const Breadcrumbs = loadable(() =>
  import(/* webpackChunkName: "Breadcrumbs" */'./Breadcrumbs'),
);

export const Events = loadable(() =>
  import(/* webpackChunkName: "Events" */'./Events'),
);

export const EventPrivacy = loadable(() =>
  import(/* webpackChunkName: "EventPrivacy" */'./EventPrivacy'),
);

export const ExternalLink = loadable(() =>
  import(/* webpackChunkName: "ExternalLink" */'./ExternalLink'),
);

export const GenericLoader = loadable(() =>
  import(/* webpackChunkName: "GenericLoader" */'./GenericLoader'),
);

export const Helmet = loadable(() =>
  import(/* webpackChunkName: "Helmet" */'./Helmet'),
);

export const Orgs = loadable(() =>
  import(/* webpackChunkName: "Orgs" */'./Orgs'),
);

export const PasswordInput = loadable(() =>
  import(/* webpackChunkName: "PasswordInput" */'./PasswordInput'),
);

export const PrivateRoute = loadable(() =>
  import(/* webpackChunkName: "PrivateRoute" */'./PrivateRoute'),
);

export const RouteWithSubRoutes = loadable(() =>
  import(/* webpackChunkName: "RouteWithSubRoutes" */'./RouteWithSubRoutes'),
);

export const RSVP = loadable(() =>
  import(/* webpackChunkName: "RSVP" */'./RSVP'),
);

export const RSVPS = loadable(() =>
  import(/* webpackChunkName: "RSVPS" */'./RSVPS'),
);

export const Search = loadable(() =>
  import(/* webpackChunkName: "Search" */'./Search'),
);

export const ScrollToTop = loadable(() =>
  import(/* webpackChunkName: "ScrollToTop" */'./ScrollToTop'),
);

export const Users = loadable(() =>
  import(/* webpackChunkName: "Users" */'./Users'),
);
