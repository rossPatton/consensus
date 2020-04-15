import _ from 'lodash';
import React, {memo} from 'react';
import {connect} from 'react-redux';

import { SessionContext } from './_context';

const SessionProvider = memo((props: any) => (
  <SessionContext.Provider value={props.session}>
    {props.children}
  </SessionContext.Provider>
));

const mapStateToProps = (store: any) => ({
  session: store.session.data,
});

export default connect(mapStateToProps)(SessionProvider);
