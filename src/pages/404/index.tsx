import React, { memo } from 'react';

const NoMatch = memo(() => (
  <div className="contain mT4 taCtr">
    <h1 className="mB2">404</h1>
    <h2 className="fs2">
      Hmm, we couldn&apos;t find anything at this url.
      <br />Is the url correct?
    </h2>
  </div>
));

export default NoMatch;
