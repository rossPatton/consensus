import React, { memo } from 'react';
import { Helmet } from '../../components';
import { canonical, description, keywords, title } from './_constants';

export const Status = memo(() => (
  <>
    <Helmet
      canonical={canonical}
      meta={[
        { name: 'description', content: description },
        { name: 'keywords', content: keywords },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
      ]}
      title={title}
    />
    <h3>status</h3>
    <h3>status</h3>
    <h3>status</h3>
    <h3>status</h3>
    <h3>status</h3>
    <h3>status</h3>
    <h3>status</h3>
    <h3>status</h3>
    <h3>status</h3>
    <h3>status</h3>
  </>
));
