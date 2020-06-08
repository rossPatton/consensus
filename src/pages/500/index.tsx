import React, { memo } from 'react';

const ErrorPage = memo(() => (
  <div className="contain m-auto min-h-halfscreen pt-4 mb-5 text-center">
    <h1 className="leading-tight">
      If you&apos;re seeing this, something went wrong.
      <br />We&apos;re working on it!
    </h1>
  </div>
));

export default ErrorPage;


