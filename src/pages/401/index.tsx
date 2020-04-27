import React, { memo } from 'react';
import {connect} from 'react-redux';

// might be a somewhat common scenario given the lengths we're going to hide pages
// if user lands somewhere private, or they're just not logged in, render this page
const UnAuthorized = memo((props: {geo: ts.geo}) => (
  <div className="text-center">
    {props.geo.countryCode === 'US' && (
      <h1 className="mb-1">
        You don&apos;t have permission to view this page. If this page belongs to a private or hidden group, you need to join the group first.
      </h1>
    )}
    {props.geo.countryCode !== 'US' && (
      <h1>
        You&apos;re seeing this because you are outside the US. We&apos;re working on having Consensus available for everyone as soon as possible!
      </h1>
    )}
  </div>
));

const mapStateToProps = (store: {geo: ts.thunk<ts.geo>}) => ({
  geo: store.geo.data,
});

export default connect(mapStateToProps)(UnAuthorized);
