import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {Paginate} from '../../../../../containers';
import {deleteOrgByUser, getOrgsBySession} from '../../../../../redux';
import {fuzzFilterList} from '../../../../../utils';
import {tContainerProps, tOrgWithRole, tState, tStore} from './_types';
import {MembershipsComponent} from './Component';

class MembershipsContainer extends PureComponent<tContainerProps, tState> {
  constructor(props: tContainerProps) {
    super(props);
    props.getOrgsBySession();
  }

  state = {
    orgs: [],
  };

  deleteOrgByUser = (ev: React.MouseEvent<HTMLButtonElement>, orgId: number) => {
    ev.preventDefault();
    const accountId = this.props.session.id as number;
    this.props.deleteOrgByUser({accountId, orgId});
  }

  onSearchChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();

    const filteredList = fuzzFilterList({
      input: this.props.orgs || [],
      search: ev.currentTarget.value,
    });

    this.setState({
      orgs: filteredList,
    });
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
      <Paginate
        items={orgsToRender}
        match={this.props.match}
        render={(itemsToRender: tOrgWithRole[]) => (
          <MembershipsComponent
            deleteOrgByUser={this.deleteOrgByUser}
            onSearchChange={this.onSearchChange}
            orgs={this.sortOrgs(itemsToRender)}
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

export const Memberships = connect(
  mapStateToProps,
  mapDispatchToProps
)(MembershipsContainer);
