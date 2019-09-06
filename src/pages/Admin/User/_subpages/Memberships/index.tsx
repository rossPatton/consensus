import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {deleteUserByOrg, getOrgsByUser} from '../../../../../redux';
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

  leaveOrg = (ev: React.MouseEvent<HTMLButtonElement>, id: number) => {
    ev.preventDefault();
    this.props.deleteUserByOrg({id});
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
      <MembershipsComponent
        leaveOrg={this.leaveOrg}
        onSearchChange={this.onSearchChange}
        orgs={this.sortOrgs(orgsToRender)}
      />
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  isLoading: store.orgs.isLoading,
  orgs: store.orgs.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  deleteUserByOrg: (query: {id: number}) => dispatch(deleteUserByOrg(query)),
  getOrgsByUser: () => dispatch(getOrgsByUser()),
});

export const Memberships = connect(
  mapStateToProps,
  mapDispatchToProps
)(MembershipsContainer);
