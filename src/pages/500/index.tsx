import React, { memo } from 'react';

import { Helmet } from '../../components';

export const Error = memo(() => (
  <>
    <Helmet
      canonical=""
      title=""
      meta={[
        { name: 'description', content: '' },
        { name: 'keywords', content: '' },
        { property: 'og:title', content: '' },
        { property: 'og:description', content: '' },
      ]}
    />
    <div className="contain mT4 taCtr">
      <h1 className="mB2">500</h1>
      <h2>If you&apos;re seeing this, something went really, really wrong</h2>
    </div>
  </>
));
