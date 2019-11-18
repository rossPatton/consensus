import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {Paginate, Search} from '../../../../../containers';
import {deleteOrgByUser, getOrgsBySession} from '../../../../../redux';
import {tContainerProps, tOrgWithRole, tState, tStore} from './_types';
import {MembershipsComponent} from './Component';

class MembershipsContainer extends PureComponent<tContainerProps, tState> {
  constructor(props: tContainerProps) {
    super(props);
    props.getOrgsBySession();
  }

  state = {
    orgs: [] as tOrgWithRole[],
  };

  deleteOrgByUser = (ev: React.MouseEvent<HTMLButtonElement>, orgId: number) => {
    ev.preventDefault();
    const accountId = this.props.session.id as number;
    this.props.deleteOrgByUser({accountId, orgId});
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
    const orgsToRender = this.state.orgs.length > 0
      ? this.state.orgs
      : this.props.orgs;

    return (
      <Search
        key="name"
        items={orgsToRender}
        render={(searchProps: any) => (
          <Paginate
            items={searchProps.items}
            page={this.props.match.params.page}
            render={(itemsToRender: tOrgWithRole[]) => (
              <MembershipsComponent
                deleteOrgByUser={this.deleteOrgByUser}
                onSearchChange={searchProps.onSearchChange}
                orgs={this.sortOrgs(itemsToRender)}
              />
            )}
          />
        )}
      />
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  isLoading: store.orgs.isLoading,
  orgs: store.orgs.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  deleteOrgByUser: (query: {accountId: number, orgId: number}) =>
    dispatch(deleteOrgByUser(query)),
  getOrgsBySession: () => dispatch(getOrgsBySession()),
});

const Memberships = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MembershipsContainer);

export default Memberships;
