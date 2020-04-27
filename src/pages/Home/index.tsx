import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {Helmet} from '~app/components';
import {Template} from '~app/containers';
import {getMeetingsByLocation} from '~app/redux';

import {canonical, description, keywords, title} from './_constants';
import {tContainerProps, tStore} from './_types';
import {HomeComponent} from './Component';

class HomeContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    this._getMeetingsByLocation();
  }

  componentDidUpdate() {
    this._getMeetingsByLocation();
  }

  _getMeetingsByLocation = () => {
    const {meetingsByLocationThunk, geoThunk} = this.props;

    if (!geoThunk.fetched) return;
    if (meetingsByLocationThunk.fetched) return;
    if (meetingsByLocationThunk.error) return;

    this.props.getMeetingsByLocationDispatch({
      city: geoThunk.data.city,
      regionCode: geoThunk.data.regionCode,
    });
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
          meetingsByLocationThunk={this.props.meetingsByLocationThunk}
          geoThunk={this.props.geoThunk}
          session={this.props.session}
        />
      </Template>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  meetingsByLocationThunk: store.meetingsByLocation,
  geoThunk: store.geo,
  session: store.session.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getMeetingsByLocationDispatch: (query: ts.meetingsByLocationQuery) =>
    dispatch(getMeetingsByLocation(query)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeContainer);

