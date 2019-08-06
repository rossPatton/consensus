import { match } from 'react-router';

export type tProps = {
  active?: number,
  count?: number,
  items: any[],
  match: match & { params: tOrgRouteParams },
}
