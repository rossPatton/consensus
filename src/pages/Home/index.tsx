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

    if (!__CLIENT__) return;
    if (!geoThunk.fetched) return;
    if (eventsByLocationThunk.fetched) return;

    if (geoThunk.fetched && !eventsByLocationThunk.fetched) {
      this.props.getEventsByLocationDispatch(geoThunk.data);
    }
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
          isLoading={this.props.isLoading}
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

