import loadable from '@loadable/component';

export const Breadcrumbs = loadable(() =>
  import(/* webpackChunkName: "Breadcrumbs" */'./Breadcrumbs'),
);

export const CitySearch = loadable(() =>
  import(/* webpackChunkName: "CitySearch" */'./CitySearch'),
);

export const Events = loadable(() =>
  import(/* webpackChunkName: "Events" */'./Events'),
);

export const ExternalLink = loadable(() =>
  import(/* webpackChunkName: "ExternalLink" */'./ExternalLink'),
);

export const FilterPanel = loadable(() =>
  import(/* webpackChunkName: "FilterPanel" */'./FilterPanel'),
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

export const PlaceholderImage = loadable(() =>
  import(/* webpackChunkName: "PlaceholderImage" */'./PlaceholderImage'),
);

export const PlanMeeting = loadable(() =>
  import(/* webpackChunkName: "PlanMeeting" */'./PlanMeeting'),
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

export const RSVPCount = loadable(() =>
  import(/* webpackChunkName: "RSVPCount" */'./RSVPCount'),
);

export const ScrollToTop = loadable(() =>
  import(/* webpackChunkName: "ScrollToTop" */'./ScrollToTop'),
);

export const Search = loadable(() =>
  import(/* webpackChunkName: "Search" */'./Search'),
);

export const SuperSearch = loadable(() =>
  import(/* webpackChunkName: "SuperSearch" */'./SuperSearch'),
);

export const Users = loadable(() =>
  import(/* webpackChunkName: "Users" */'./Users'),
);
