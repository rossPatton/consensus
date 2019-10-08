import React, {memo} from 'react';

import {Helmet} from '../../components';
import {ErrorBoundary} from '../../containers';
import {canonical, description, keywords, title} from './_constants';
import {HomeComponent} from './Component';

export const Home = memo(() => (
  <ErrorBoundary>
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
    <HomeComponent />
  </ErrorBoundary>
));

