import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {GenericLoader, Helmet} from '../../components';
import {getOrg} from '../../redux';
import {getUserRole} from '../../utils';
import {tContainerProps, tStore} from './_types';
import {OrganizationComponent} from './Component';

export class OrganizationContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);

    // 0 is just the default, not possible in the db
    // basically dont re-fetch every time
    if (props.org.id !== 0) return;
    props.getOrg(props.match.params);
  }

  render() {
    const { isLoading, location, match, org, session, usersByOrg } = this.props;
    const role = getUserRole(session, org);

    return (
      <>
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
        <GenericLoader
          isLoading={isLoading}
          render={() => (
            <OrganizationComponent
              location={location}
              match={match}
              org={org}
              usersByOrg={usersByOrg}
              role={role}
            />
          )}
        />
      </>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  isLoading: store.org.isLoading,
  org: store.org.data,
  session: store.session.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getOrg: (params: tOrgRouteParams) => dispatch(getOrg(params)),
});

export const Organization = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationContainer);
