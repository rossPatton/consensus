import React, { memo } from 'react';
import { Helmet } from '../../components';
import { canonical, description, keywords, title } from './_constants';

export const Config = memo(() => (
  <>
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
    config test
  </>
));
