import { PureComponent } from 'react';

import { withRouter } from '~app/utils';
import { tProps } from './_types';

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
const ScrollToTop = withRouter(ScrollToTopComponent);
export default ScrollToTop;
