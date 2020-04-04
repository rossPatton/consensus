import React, { memo } from 'react';

const NoMatch = memo(() => (
  <div className="text-center">
    <h1 className="mb-2">404</h1>
    <h2>
      Hmm, we couldn&apos;t find anything at this url.
      <br />Is the url correct?
    </h2>
  </div>
));

export default NoMatch;
