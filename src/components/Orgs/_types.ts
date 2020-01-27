import {match} from 'react-router';

export type tProps = {
  orgs: tOrg[],
}

export type tContainerProps = tProps & {
  match: match & {params: tPaginateParams},
}
