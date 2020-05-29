import _ from 'lodash';
import React, {memo} from 'react';
import {connect} from 'react-redux';

import {Helmet} from '~app/components';
import {Template} from '~app/containers';

import {canonical, description, keywords, title} from './_constants';
import {tProps, tStore} from './_types';
import {HomeComponent} from './Component';

const HomeContainer = memo((props: tProps) => (
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
      geoThunk={props.geoThunk}
      session={props.session}
    />
  </Template>
));

const mapStateToProps = (store: tStore) => ({
  geoThunk: store.geo,
  session: store.session.data,
});

export default connect(mapStateToProps)(HomeContainer);

