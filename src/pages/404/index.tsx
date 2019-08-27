import React, { memo } from 'react';

import { Helmet } from '../../components';

export const NoMatch = memo(() => (
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
      <h1 className="mB2">404</h1>
      <h2>Hmm, we couldn&apos;t find anything at this url.</h2>
    </div>
  </>
));
