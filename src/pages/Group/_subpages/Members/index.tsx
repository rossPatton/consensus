import React, {memo} from 'react';
import {connect} from 'react-redux';

import {Helmet} from '~app/components';
import {ErrorBoundary} from '~app/containers';

import {tContainerProps, tStore} from './_types';
import {MembersComponent} from './Component';

const MembersContainer = memo((props: tContainerProps) => {
  const {group, match: {params}, role, usersThunk} = props;
  const {section} = params;

  return (
    <ErrorBoundary status={usersThunk?.error?.status}>
      <Helmet
        canonical={`/group/${group.handle}/members`}
        title={`Consensus Group: ${group.name} Memberships`}
        meta={[
          { name: 'description', content: group.description },
          { name: 'keywords', content: `group,${group.category},membership` },
        ]}
      />
      <MembersComponent
        group={group}
        role={role}
        section={section}
      />
    </ErrorBoundary>
  );
});

const mapStateToProps = (store: tStore) => ({
  usersThunk: store.usersByGroupId,
});

export default connect(mapStateToProps)(MembersContainer);
