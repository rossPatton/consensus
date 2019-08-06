import { match } from 'react-router';

export type tProps = {
  allDecisions: tDecision[],
  decisionsToRender: tDecision[],
  match: match & { params: tOrgRouteParams },
}
