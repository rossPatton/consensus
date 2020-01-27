import loglevel from 'loglevel';
import React, {ErrorInfo, PureComponent} from 'react';

import {ErrorPageComponent} from '../../routes/ErrorPage';
import {tInfoUnion, tProps, tState, tStatusUnion} from './_types';

export default class ErrorBoundary extends PureComponent<tProps, tState> {
  static defaultProps = {
    error: null as any,
    status: 200 as tStatusUnion,
  };

  state = {
    error: this.props.error,
    info: null as tInfoUnion,
    status: this.props.status,
  };

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({
      error,
      info,
    });
    loglevel.error(this.state);
    // TODO log to separate service, but only show user 500 page
  }

  render() {
    const {error, status} = this.state;

    if (error) {
      return (
        <ErrorPageComponent />
      );
    } else if (status === 400) {
      return (
        <ErrorPageComponent />
      );
    }

    return this.props.children;
  }
}
