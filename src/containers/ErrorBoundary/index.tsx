import loglevel from 'loglevel';
import React, {ErrorInfo, PureComponent} from 'react';

import {ErrorPageComponent} from '../../routes/ErrorPage';
import {tState} from './_types';

export default class ErrorBoundary extends PureComponent<any, tState> {
  state = {
    hasError: false,
  };

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({
      error,
      hasError: true,
      info,
    });
    loglevel.error(this.state);
    // TODO log to separate service, but only show user 500 page
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorPageComponent />
      );
    }

    return this.props.children;
  }
}
