import _ from 'lodash';
import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {Helmet} from '../../../../../components';
import {ErrorBoundary, GenericLoader} from '../../../../../containers';
import {Paginate, SearchFilter} from '../../../../../containers';
import {deleteOrgByUserId, getOrgsByUserId} from '../../../../../redux';
import {tContainerProps, tOrgWithRole, tState, tStore} from './_types';
import {MembershipsComponent} from './Component';

class MembershipsContainer extends PureComponent<tContainerProps, tState> {
  constructor(props: tContainerProps) {
    super(props);

    const userId = _.get(props, 'sessionThunk.data.profile.id', null);
    if (userId) {
      props.getOrgsByUserIdDispatch({userId})
        .catch(loglevel.error);
    }
  }

  state = {
    orgs: [] as tOrgWithRole[],
  };

  leaveOrg = (ev: React.MouseEvent<HTMLButtonElement>, orgId: number) => {
    ev.preventDefault();
    if (orgId) {
      this.props.deleteOrgByUserIdDispatch({orgId})
        .catch(loglevel.error);
    }
  }

  sortOrgs(orgs: tOrgWithRole[]) {
    return orgs.sort((a, b) => {
      const aIsAdmin = a.role === 'facilitator';
      const bIsAdmin = b.role === 'facilitator';
      if (aIsAdmin && !bIsAdmin) return -1;
      if (bIsAdmin && !aIsAdmin) return 1;
      return 0;
    });
  }

  render() {
    const {orgsByUserIdThunk} = this.props;

    return (
      <ErrorBoundary status={_.get(orgsByUserIdThunk, 'error.status', 200)}>
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
          isLoading={orgsByUserIdThunk.isLoading}
          render={() => {
            const orgsToRender = this.state.orgs.length > 0
              ? this.state.orgs
              : orgsByUserIdThunk.data;

            return (
              <SearchFilter
                searchKey="name"
                items={orgsToRender}
                render={(searchProps: tSearchFilterProps) => (
                  <Paginate
                    items={searchProps.items}
                    render={(itemsToRender: tOrgWithRole[]) => (
                      <MembershipsComponent
                        leaveOrg={this.leaveOrg}
                        onSearchChange={searchProps.onSearchChange}
                        // just use Orgs component, put sort there
                        orgs={this.sortOrgs(itemsToRender)}
                      />
                    )}
                  />
                )}
              />
            );
          }}
        />
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  orgsByUserIdThunk: store.orgsByUserId,
  sessionThunk: store.session,
});

const mapDispatchToProps = (dispatch: Function) => ({
  deleteOrgByUserIdDispatch: (query: tDeleteUserByOrgIdQuery) =>
    dispatch(deleteOrgByUserId(query)),

  getOrgsByUserIdDispatch: (query: tOrgsByUserIdQuery) =>
    dispatch(getOrgsByUserId(query)),
});

const Memberships = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MembershipsContainer);

export default Memberships;
