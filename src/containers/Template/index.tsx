import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {ErrorBoundary, GenericLoader} from '~app/containers';
import {getGeo} from '~app/redux';

import {Footer, Header} from './_components';
import {tProps} from './_types';

// any elements or components or functionality that should be present on all pages
class Template extends PureComponent<tProps> {
  constructor(props: tProps) {
    super(props);
    if (props.geoThunk.fetched) return;
    props.getGeoDispatch();
  }

  render() {
    const {children, geoThunk} = this.props;
    const geoStatus = geoThunk?.error?.status;

    return (
      <>
        <Header />
        <ErrorBoundary status={geoStatus}>
          <main className="contain m-auto min-h-halfscreen pb-5">
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

const mapStateToProps = (store: {geo: ts.thunk<ts.geo>, session: ts.thunk<ts.session>}) => ({
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
