import React, { memo } from 'react';

const ErrorPage = memo(() => (
  <div className="contain mT4 taCtr">
    <h1 className="fs2">
      If you&apos;re seeing this, something went wrong.
      <br />We&apos;re working on it!
    </h1>
  </div>
));

export default ErrorPage;
