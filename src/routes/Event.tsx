import loadable from '@loadable/component';
import React from 'react';

const EventComponent = loadable(() =>
  import(/* webpackChunkName: "Event" */'../pages/Event'), {
  fallback: (
    <>Loading...</>
  ),
});

export const Event = {
  component: EventComponent,
  exact: true,
  path: '/event/:id',
};
