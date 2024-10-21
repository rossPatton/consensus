import * as H from 'history';
import { RouteComponentProps } from 'react-router';

export type tState = {
  page?: number,
}

export type tProps = RouteComponentProps<any> & tState & {
  className?: string,
  count?: number,
  items: object[],
  location: H.Location,
  placement?: 'top' | 'bottom',
  render: (itemsToRender: any[]) => React.ReactNode,
};
