import loadable from '@loadable/component';
import React from 'react';

const DecisionComponent = loadable(() =>
  import(/* webpackChunkName: "Decision" */'../pages/Decision'), {
  fallback: (
    <>Loading...</>
  ),
});

export const Decision = {
  component: DecisionComponent,
  exact: true,
  path: '/decision/:id',
};
