import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Helmet} from '../../components';
import {Template} from '../../containers';
import {getEventsByLocation} from '../../redux';
import {canonical, description, keywords, title} from './_constants';
import {tContainerProps, tStore} from './_types';
import {HomeComponent} from './Component';

class HomeContainer extends Component<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    // props.getEventsByLocationDispatch(props.geo);
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
          eventsByLocation={this.props.eventsByLocation}
          geo={this.props.geo}
          isLoading={this.props.isLoading}
        />
      </Template>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  eventsByLocation: store.eventsByLocation,
  geo: store.geo.data,
  session: store.session.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getEventsByLocationDispatch: (query: any) => dispatch(getEventsByLocation(query)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeContainer);

