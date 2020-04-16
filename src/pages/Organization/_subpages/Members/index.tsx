import {Helmet} from '@app/components';
import {ErrorBoundary} from '@app/containers';
import _ from 'lodash';
import React, {memo} from 'react';
import {connect} from 'react-redux';

import {tContainerProps, tStore} from './_types';
import {MembersComponent} from './Component';

const MembersContainer = memo((props: tContainerProps) => {
  const {group, match: {params}, role, usersThunk} = props;
  const {section} = params;

  return (
    <ErrorBoundary status={_.get(usersThunk, 'error.status', 200)}>
      <Helmet
        canonical=""
        title=""
        meta={[
          { name: 'description', content: '' },
          { name: 'keywords', content: '' },
          { property: 'og:title', content: '' },
          { property: 'og:description', content: '' },
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
  usersThunk: store.usersByOrgId,
});

export default connect(mapStateToProps)(MembersContainer);
