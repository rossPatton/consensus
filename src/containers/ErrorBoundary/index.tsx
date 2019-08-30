import React, {ErrorInfo, PureComponent} from 'react';
import {Redirect} from 'react-router-dom';

import {tState} from './_types';

export class ErrorBoundary extends PureComponent<any, tState> {
  state = {
    hasError: false,
  };

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({
      error,
      hasError: true,
      info,
    });
    // TODO log to separate service, but only show user 500 page
  }

  render() {
    if (this.state.hasError) return <Redirect to="/500" />;
    return this.props.children;
  }
}
