import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {ErrorBoundary, GenericLoader} from '..';
import {getGeo} from '../../redux';
import {Footer, Header} from './_components';
import {tProps} from './_types';

// any elements or components or functionality that should be present on all pages
class Template extends PureComponent<tProps> {
  constructor(props: tProps) {
    super(props);
    props.getGeoDispatch();
  }

  render() {
    const {children, geoThunk} = this.props;
    const geoStatus = _.get(geoThunk, 'error.status', null);

    return (
      <>
        <Header />
        <ErrorBoundary status={geoStatus}>
          <GenericLoader
            isLoading={geoThunk.isLoading}
            render={() => (
              <main className="mT5 mB5 pB5">
                {children}
              </main>
            )}
          />
        </ErrorBoundary>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (store: {geo: tThunk<tGeo>}) => ({
  geoThunk: store.geo,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getGeoDispatch: () => dispatch(getGeo()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Template);

// export const AppShellHot = hot(module)(AppShellComponent);
