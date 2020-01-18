import {match} from 'react-router';

export type tProps = {
  orgs: tOrg[],
}

export interface tContainerProps extends tProps {
  match: match & {params: tPaginateParams},
}
