import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {Helmet} from '../../components';
import {Template} from '../../containers';
import {getEventsByLocation} from '../../redux';
import {canonical, description, keywords, title} from './_constants';
import {tContainerProps, tStore} from './_types';
import {HomeComponent} from './Component';

class HomeContainer extends PureComponent<tContainerProps> {
  componentDidUpdate() {
    const {eventsByLocationThunk, geoThunk} = this.props;

    if (!geoThunk.fetched) return;
    if (eventsByLocationThunk.fetched) return;
    if (eventsByLocationThunk.error) return;

    // TODO eventually set it up so we dont do this if user is signed in
    this.props.getEventsByLocationDispatch(geoThunk.data);

    // if (geoThunk.fetched) {
    //   this.props.getEventsByLocationDispatch(geoThunk.data);
    // } else if (_.get(session, 'profile.cityId', 0) > 0) {
    //   this.props.getEventsByLocationDispatch({
    //     city: session.profile.city,
    //     region: session.profile.region,
    //   });
    // }
  }

  render() {
    return (
      <Template>
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
          eventsByLocationThunk={this.props.eventsByLocationThunk}
          geo={this.props.geoThunk.data}
          isLoading={this.props.geoThunk.isLoading}
          session={this.props.session}
        />
      </Template>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  eventsByLocationThunk: store.eventsByLocation,
  geoThunk: store.geo,
  session: store.session.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getEventsByLocationDispatch: (query: tGeo) => dispatch(getEventsByLocation(query)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeContainer);

