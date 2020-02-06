import React, {memo} from 'react';
import {connect} from 'react-redux';

import {Helmet} from '../../components';
import {ErrorBoundary} from '../../containers';
import {canonical, description, keywords, title} from './_constants';
import {tProps, tStore} from './_types';
import {HomeComponent} from './Component';

const Home = memo((props: tProps) => (
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
      geo={props.geo}
      isLoading={props.isLoading}
    />
  </ErrorBoundary>
));

const mapStateToProps = (store: tStore) => ({
  isLoading: store.geo.isLoading,
  geo: store.geo.data,
});

export default connect(mapStateToProps)(Home);

