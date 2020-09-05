import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';

import {Helmet} from '~app/components';
import {Template} from '~app/containers';
import {getMeetings} from '~app/redux';

import {canonical, description, keywords, title} from './_constants';
import {tContainerProps, tStore} from './_types';
import {HomeComponent} from './Component';

class HomeContainer extends React.PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    this._getMeetings();
  }

  _getMeetings = async () => {
    return this.props.getMeetingsDispatch({
      limit: 4,
      role: 'n/a',
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
          ]}
        />
        <HomeComponent
          geoThunk={this.props.geoThunk}
          meetings={this.props.meetings}
        />
      </Template>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  geoThunk: store.geo,
  meetings: store.meetings.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getMeetingsDispatch: (query: ts.getMeetingQuery) => dispatch(getMeetings(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);

