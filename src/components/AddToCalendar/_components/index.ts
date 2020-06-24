import loadable from '@loadable/component';

export const AddToCalendarButton = loadable(() =>
  import(/* webpackChunkName: "AddToCalendar Button" */'./Button'),
);

export const AddToCalendarPortal = loadable(() =>
  import(/* webpackChunkName: "AddToCalendar Portal" */'./Portal'),
);
