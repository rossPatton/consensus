import React, {PureComponent} from 'react';
import { withRouter } from 'react-router-dom';

import {tProps} from './_types';

class ScrollToTopComponent extends PureComponent<tProps> {
  componentDidUpdate(prevProps: tProps) {
    if (
      this.props.location.pathname !== prevProps.location.pathname
    ) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children || null;
  }
}

// @ts-ignore
export const ScrollToTop = withRouter(ScrollToTopComponent);
