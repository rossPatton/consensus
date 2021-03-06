import loadable from '@loadable/component';

export const AddToCalendar = loadable(() =>
  // @ts-ignore
  import(/* webpackChunkName: "AddToCalendar" */'./AddToCalendar'),
);

export const Avatar = loadable(() =>
  import(/* webpackChunkName: "Avatar" */'./Avatar'),
);

export const Breadcrumbs = loadable(() =>
  import(/* webpackChunkName: "Breadcrumbs" */'./Breadcrumbs'),
);

export const Categories = loadable(() =>
  import(/* webpackChunkName: "Categories" */'./Categories'),
);

export const CitySearch = loadable(() =>
  import(/* webpackChunkName: "CitySearch" */'./CitySearch'),
);

export const Description = loadable(() =>
  import(/* webpackChunkName: "Description" */'./Description'),
);

export const Emoji = loadable(() =>
  import(/* webpackChunkName: "Emoji" */'./Emoji'),
);

export const FileUpload = loadable(() =>
  import(/* webpackChunkName: "FileUpload" */'./FileUpload'),
);

export const Form = loadable(() =>
  import(/* webpackChunkName: "Form" */'./Form'),
);

export const Meetings = loadable(() =>
  import(/* webpackChunkName: "Meetings" */'./Meetings'),
);

export const ExternalLink = loadable(() =>
  import(/* webpackChunkName: "ExternalLink" */'./ExternalLink'),
);

export const FilterPanel = loadable(() =>
  import(/* webpackChunkName: "FilterPanel" */'./FilterPanel'),
);

export const Helmet = loadable(() =>
  import(
    /* webpackMode: "eager" */
    /* webpackChunkName: "Helmet" */
    './Helmet'),
);

export const Groups = loadable(() =>
  import(/* webpackChunkName: "Group" */'./Groups'),
);

export const MeetingFeaturedImage = loadable(() =>
  import(/* webpackChunkName: "MeetingFeaturedImage" */'./MeetingFeaturedImage'),
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

export const Search = loadable(() =>
  import(/* webpackChunkName: "Search" */'./Search'),
);

export const Share = loadable(() =>
  import(/* webpackChunkName: "Share" */'./Share'),
);

export const SuperSearch = loadable(() =>
  import(/* webpackChunkName: "SuperSearch" */'./SuperSearch'),
);

export const Users = loadable(() =>
  import(/* webpackChunkName: "Users" */'./Users'),
);

// export const ValidateToken = loadable(() =>
//   import(/* webpackChunkName: "ValidateToken" */'./ValidateToken'),
// );
