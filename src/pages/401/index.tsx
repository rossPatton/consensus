import React, { memo } from 'react';
import {connect} from 'react-redux';

// might be a somewhat common scenario given the lengths we're going to hide pages
// if user lands somewhere private, or they're just not logged in, render this page
const UnAuthorized = memo(props => (
  <div className="text-center">
    {console.log('dont you... forget about me(geo)... no no no no ', props)}
    <h1 className="mb-1">
      You don&apos;t have permission to view this page. If this page belongs to a private or hidden group, you need to join the group first.
    </h1>
    <h2 className="text-base">
      If you are seeing this because you&apos;re outside the US, don&apos;t worry, we are working on having Consensus available for everyone as soon as possible.
    </h2>
  </div>
));

const mapStateToProps = (store: {geo: tThunk<tGeo>}) => ({
  geo: store.geo.data,
});

export default connect(mapStateToProps)(UnAuthorized);
