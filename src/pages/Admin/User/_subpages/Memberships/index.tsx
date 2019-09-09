import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {Paginate} from '../../../../../containers';
import {deleteOrgByUser, getOrgsByUser} from '../../../../../redux';
import {fuzzFilterList} from '../../../../../utils';
import {tContainerProps, tState, tStore} from './_types';
import {MembershipsComponent} from './Component';

class MembershipsContainer extends PureComponent<tContainerProps, tState> {
  constructor(props: tContainerProps) {
    super(props);
    props.getOrgsByUser();
  }

  state = {
    orgs: [],
  };

  deleteOrgByUser = (ev: React.MouseEvent<HTMLButtonElement>, orgId: number) => {
    ev.preventDefault();
    const userId = this.props.session.id as number;
    this.props.deleteOrgByUser({orgId, userId});
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

  sortOrgs(orgs: tOrg[]) {
    return orgs.sort((a, b) => {
      const aIsAdmin = a.role === 'admin';
      const bIsAdmin = b.role === 'admin';
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
        render={(itemsToRender: tOrg[]) => (
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
  deleteOrgByUser: (query: {orgId: number, userId: number}) =>
    dispatch(deleteOrgByUser(query)),
  getOrgsByUser: () => dispatch(getOrgsByUser()),
});

export const Memberships = connect(
  mapStateToProps,
  mapDispatchToProps
)(MembershipsContainer);
