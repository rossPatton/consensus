import loadable from '@loadable/component';

export const ApprovalResults = loadable(() =>
  import(/* webpackChunkName: "ApprovalResults" */'./ApprovalResults'),
);

export const ApprovalVote = loadable(() =>
  import(/* webpackChunkName: "ApprovalVote" */'./ApprovalVote'),
);

export const SimpleMajorityResults = loadable(() =>
  import(/* webpackChunkName: "SimpleMajorityResults" */'./SimpleMajorityResults'),
);

export const SimpleMajorityVote = loadable(() =>
  import(/* webpackChunkName: "SimpleMajorityVote" */'./SimpleMajorityVote'),
);
