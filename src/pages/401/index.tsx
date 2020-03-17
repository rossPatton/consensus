import React, { memo } from 'react';

// might be a somewhat common scenario given the lengths we're going to hide pages
// if user lands somewhere private, or they're just not logged in, render this page
const UnAuthorized = memo(() => (
  <div className="contain mT4 taCtr">
    <h1 className="fs2 mB3">
      You don&apos;t have permission to view this page. If this page belongs to a private or hidden group, you need to join the group first.
    </h1>
    <h2 className="copyBlack fs5">
      If you are seeing this because you&apos; outside the US, don&apos;t worry, we are working on having Consensus available for everyone as soon as possible.
    </h2>
  </div>
));

export default UnAuthorized;
