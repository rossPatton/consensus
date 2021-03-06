import loglevel from 'loglevel';
import React, {ErrorInfo, PureComponent} from 'react';

import {ErrorPageComponent} from '~app/routes/ErrorPage';
import {NoMatchComponent} from '~app/routes/NoMatch';
import {UnAuthorizedComponent} from '~app/routes/UnAuthorized';

import {tProps, tState} from './_types';

export default class ErrorBoundary extends PureComponent<tProps, tState> {
  static defaultProps = {
    error: null as any,
    status: 200 as ts.statusUnion,
  };

  state = {
    error: this.props.error,
    info: null as ts.infoUnon,
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

    if (isSubPage && status === 500) {
      return (
        <div className="p-2">
          Something went wrong loading this section. Try refreshing?
        </div>
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
