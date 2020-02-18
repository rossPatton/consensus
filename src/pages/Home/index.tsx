import _ from 'lodash';
import loglevel from 'loglevel';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Helmet} from '../../components';
import {ErrorBoundary} from '../../containers';
import {getEventsByLocation, getGeo} from '../../redux';
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
    props.getGeoDispatch()
      .then(res => {
        const query = {...res.payload};
        return props.getEventsByLocationDispatch(query);
      })
      .catch(loglevel.error);
  }

  render() {
    console.log('all props for home => ', this.props);
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
          eventsByLocation={this.props.eventsByLocation.slice(0, 4)}
          geo={this.props.geo}
          isLoading={this.props.isLoading}
        />
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  eventsByLocation: store.eventsByLocation.data,
  isLoading: store.geo.isLoading,
  geo: store.geo.data,
  session: store.session.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getEventsByLocationDispatch: (query: any) => dispatch(getEventsByLocation(query)),
  getGeoDispatch: () => dispatch(getGeo()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeContainer);

