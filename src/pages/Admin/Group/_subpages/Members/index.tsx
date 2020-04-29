import React, {memo} from 'react';
import {connect} from 'react-redux';

import {ErrorBoundary} from '~app/containers';

import {tContainerProps, tStore} from './_types';
import {MembersComponent} from './Component';

const MembersContainer = memo((props: tContainerProps) => (
  <ErrorBoundary status={props.usersThunk?.error?.status}>
    <MembersComponent group={props.group} />
  </ErrorBoundary>
));

const mapStateToProps = (store: tStore) => ({
  usersThunk: store.usersByGroupId,
});

export default connect(mapStateToProps)(MembersContainer);
