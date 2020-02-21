import React, { memo } from 'react';

// might be a somewhat common scenario given the lengths we're going to hide pages
// if user lands somewhere private, or they're just not logged in, render this page
const UnAuthorized = memo(() => (
  <div className="contain mT4 taCtr">
    <h1 className="fs2">
      You don&apos;t have permission to view this group&apos;s page.
      <br />You need to join this group first!
    </h1>
  </div>
));

export default UnAuthorized;
