import React, { memo } from 'react';

import {Helmet} from '../../components';
import {canonical, description, keywords, title} from './_constants';

export const NoMatch = memo(() => (
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
      <h1 className="mB2">404</h1>
      <h2>Hmm, we couldn&apos;t find anything at this url.</h2>
    </div>
  </>
));
