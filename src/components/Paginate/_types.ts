import { match } from 'react-router';

export type tProps = {
  active?: number,
  count?: number,
  match: match & { params: tOrgRouteParams },
  total: number,
}
