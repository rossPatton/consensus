import _ from 'lodash';
import React from 'react';

import { DESKTOP, MOBILE } from './_constants';
import { MediaContext } from './_context';
import { tState } from './_types';

/**
 * Provides isMobile and isDesktop props to all child components
 * This is used to render components adaptively when responsive design starts to
 * get overly complicated, or to make it easier to split up component types
 */
class MatchMediaProvider extends React.PureComponent<{}, tState> {
  constructor(props: any) {
    super(props);

    if (__CLIENT__) {
      const {isMobile, isDesktop} = this._runMediaQuery();

      this.state = {
        isMobile,
        isDesktop,
      };
    } else {
      this.state = {
        isMobile: true,
        isDesktop: false,
      };
    }
  }

  componentDidMount() {
    this.setState(this._runMediaQuery());
    window.addEventListener('resize', this._onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._onResize);
  }

  _runMediaQuery = () => ({
    isMobile: window.matchMedia(MOBILE).matches,
    isDesktop: window.matchMedia(DESKTOP).matches,
  });

  _onResize = _.debounce(() => {
    this.setState(this._runMediaQuery());
  }, 20);

  render() {
    return (
      <MediaContext.Provider value={this.state}>
        {this.props.children}
      </MediaContext.Provider>
    );
  }
}

/**
 *
 */
export default MatchMediaProvider;
