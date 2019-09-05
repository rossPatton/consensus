import { match } from 'react-router';

export type tProps = {
  className: string,
  count: number,
  items: object[],
  match: match & {
    params: {
      page?: string,
    },
  },
  render: (itemsToRender: any[]) => React.ReactNode,
}
