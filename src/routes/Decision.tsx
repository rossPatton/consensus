import loadable from '@loadable/component';

const DecisionComponent = loadable(() =>
  import(/* webpackChunkName: "Decision" */'../pages/Decision'),
);

export const Decision = {
  component: DecisionComponent,
  exact: true,
  path: '/decision/:id',
};
