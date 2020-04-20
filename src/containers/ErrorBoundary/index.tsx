import loglevel from 'loglevel';
import React, {ErrorInfo, PureComponent} from 'react';

import {ErrorPageComponent} from '~app/routes/ErrorPage';
import {NoMatchComponent} from '~app/routes/NoMatch';
import {UnAuthorizedComponent} from '~app/routes/UnAuthorized';

import {tProps, tState} from './_types';

export default class ErrorBoundary extends PureComponent<tProps, tState> {
  static defaultProps = {
    error: null as any,
    status: 200 as tStatusUnion,
  };

  state = {
    error: this.props.error,
    info: null as tInfoUnion,
  };

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({
      error,
      info,
    }, () => loglevel.error(error, info));
    // TODO log to separate service, but only show user 500 page
  }

  render() {
    const {isSubPage, status} = this.props;

    // @TODO perhaps expand the options here a bit
    // we put error boundaries on subpages as well, and instead of blowing up the page
    // we just render a small error message in place instead
    // a 204 here is not a problem really, a subpage for upcoming events just
    // might not have any, so we only care about codes over 400
    if (isSubPage && status === 500) {
      return (
        <>Something went wrong loading this section. Try refreshing?</>
      );
    }

    if (!isSubPage) {
      if (status === 500) return <ErrorPageComponent />;

      // SSR will just redirect, but sometimes on client we need to render this
      if (status === 401) return <UnAuthorizedComponent />;

      // treat 204 status as 404 on front-end
      // nothing went wrong, the route and params are correct, just no data
      if (status === 204) return <NoMatchComponent />;
    }

    return this.props.children;
  }
}
