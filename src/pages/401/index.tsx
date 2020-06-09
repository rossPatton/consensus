import React, { memo } from 'react';
import {connect} from 'react-redux';

// might be a somewhat common scenario given the lengths we're going to hide pages
// if user lands somewhere private, or they're just not logged in, render this page
const UnAuthorized = memo(() => (
  <div className="contain m-auto min-h-halfscreen pt-4 mb-5 text-center">
    <h1 className="mb-2">
      You don&apos;t have permission to view this page.
      <br />If this page belongs to a hidden group, you need to be invited to the group first.
    </h1>
    <h2>If you&apos;re outside the US, We&apos;re working on having Consensus available for everyone as soon as possible!</h2>
  </div>
));

const mapStateToProps = (store: {geo: ts.thunk<ts.geo>}) => ({
  geo: store.geo.data,
});

export default connect(mapStateToProps)(UnAuthorized);
