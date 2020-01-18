import { match } from 'react-router';

export interface tProps {
  match: match & { params: tCategoryParams },
}
