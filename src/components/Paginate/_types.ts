import { match } from 'react-router';

export type tProps = {
  active?: number,
  className?: string,
  count?: number,
  match: match & {
    params: {
      page?: string,
    },
  },
  total: number,
}
