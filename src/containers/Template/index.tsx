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
    // if already fetched, dont do again
    if (props.geoThunk.fetched) return;

    // if user is logged in and has given us location info
    // if (_.get(props, 'session.profile.cityId', 0) !== 0) return;

    props.getGeoDispatch();
  }

  render() {
    const {children, geoThunk} = this.props;
    const geoStatus = _.get(geoThunk, 'error.status', null);

    return (
      <>
        <Header />
        <ErrorBoundary status={geoStatus}>
          <main className="mt-5 mb-5 pb-5">
            <GenericLoader
              isLoading={geoThunk.isLoading}
              render={() => children}
            />
          </main>
        </ErrorBoundary>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (store: {geo: tThunk<tGeo>, session: tThunk<tSession>}) => ({
  geoThunk: store.geo,
  session: store.session.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getGeoDispatch: () => dispatch(getGeo()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Template);
