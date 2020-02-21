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

    props.getGeoDispatch()
      .then(res => {
        const query = {...res.payload};
        return props.getEventsByLocationDispatch(query);
      })
      .catch(loglevel.error);
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
          eventsByLocation={this.props.eventsByLocation}
          geo={this.props.geo}
          isLoading={this.props.isLoading}
        />
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  eventsByLocation: store.eventsByLocation,
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

