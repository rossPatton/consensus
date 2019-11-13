import * as H from 'history';
import { RouteComponentProps } from 'react-router';

export interface tProps extends RouteComponentProps<any> {
  className?: string,
  count?: number,
  items: object[],
  location: H.Location,
  page: string,
  render: (itemsToRender: any[]) => React.ReactNode,
}
