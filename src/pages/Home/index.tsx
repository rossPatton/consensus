import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Helmet} from '../../components';
import {ErrorBoundary} from '../../containers';
import {getGeo} from '../../redux';
import {canonical, description, keywords, title} from './_constants';
import {tContainerProps, tStore} from './_types';
import {HomeComponent} from './Component';

class HomeContainer extends Component<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    const {session} = props;
    const {city} = _.get(session, 'profile', {}) as tUser;
    const loggedIn = session.isAuthenticated;
    const isUser = session.type === 'user';

    if (loggedIn && isUser && city) return;
    if (loggedIn && !isUser) return;

    // only get geo data for users, and only if we don't already have it
    props.getGeoDispatch();
  }

  render() {
    return (
      <ErrorBoundary status={200}>
        <Helmet
          canonical={canonical}
          title={title}
          meta={[
            { name: 'description', content: description },
            { name: 'keywords', content: keywords },
            { property: 'og:title', content: title },
            { property: 'og:description', content: description },
          ]}
        />
        <HomeComponent
          geo={this.props.geo}
          isLoading={this.props.isLoading}
        />
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  isLoading: store.geo.isLoading,
  geo: store.geo.data,
  session: store.session.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getGeoDispatch: () => dispatch(getGeo()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeContainer);

