import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {Helmet} from '~app/components';
import {Template} from '~app/containers';

import {canonical, description, keywords, title} from './_constants';
import {tProps, tStore} from './_types';
import {HomeComponent} from './Component';

class HomeContainer extends PureComponent<tProps> {
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
          session={this.props.session}
        />
      </Template>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  geoThunk: store.geo,
  session: store.session.data,
});

export default connect(mapStateToProps)(HomeContainer);

