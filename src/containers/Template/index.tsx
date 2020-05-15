import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {ErrorBoundary, GenericLoader} from '~app/containers';
import {getGeo, getRoles, getRsvps} from '~app/redux';
import {agent} from '~app/utils';

import {Footer, Header} from './_components';
import {tProps, tStore} from './_types';

/**
 * @description wrapper container that contains the repeated visual components + handles fetching some data we only want to fetch once
 */
class Template extends PureComponent<tProps> {
  constructor(props: tProps) {
    super(props);
    if (!props.geoThunk.fetched) {
      props.getGeoDispatch();
    }

    if (!props.session.isAuthenticated) return;
    if (props.session.type === 'group') return;
    if (!props.rsvpsThunk.fetched) props.getRsvpsDispatch();
    if (!props.rolesThunk.fetched) props.getRolesDispatch();
  }

  // componentDidMount() {
  //   fetch(`${__URL__}/api/v1/spaces`, {agent, method: 'POST'})
  //     .then(console.log)
  //     .catch(console.error);
  // }

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

const mapStateToProps = (store: tStore) => ({
  geoThunk: store.geo,
  rolesThunk: store.roles,
  rsvpsThunk: store.rsvps,
  session: store.session.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getGeoDispatch: () => dispatch(getGeo()),
  getRolesDispatch: () => dispatch(getRoles()),
  getRsvpsDispatch: () => dispatch(getRsvps()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Template);
