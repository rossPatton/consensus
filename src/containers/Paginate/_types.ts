import * as H from 'history';
import { match } from 'react-router';

export type tProps = {
  className: string,
  count: number,
  items: object[],
  location: H.Location,
  match: match & {
    params: {
      page?: string,
    },
  },
  render: (itemsToRender: any[]) => React.ReactNode,
}
