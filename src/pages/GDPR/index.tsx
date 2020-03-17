import React, { memo } from 'react';

// GDPR compliance, at least for now
const GDPR = memo(() => (
  <div className="contain mT4 taCtr">
    <h1 className="fs2">
      Consensus is currently not available outside of the United States. Don&apos;t worry - it&apos;s only temporary! We&apos;ll be available everywhere soon.
    </h1>
  </div>
));

export default GDPR;
