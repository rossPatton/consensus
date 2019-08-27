import React, { memo } from 'react';

import { Helmet } from '../../components';
import {canonical, description, keywords, title} from './_constants';

export const ErrorPage = memo(() => (
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
    <div className="contain mT4 taCtr">
      <h1 className="mB2">500</h1>
      <h2>If you&apos;re seeing this, something went really, really wrong</h2>
    </div>
  </>
));
