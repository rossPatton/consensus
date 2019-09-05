import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {getOrgsByUser} from '../../../../../redux';
import {tContainerProps, tStore} from './_types';
import {MembershipsComponent} from './Component';

class MembershipsContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    props.getOrgsByUser();
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
    const sortedOrgs = this.sortOrgs(this.props.orgs);

    return (
      <MembershipsComponent
        orgs={sortedOrgs}
      />
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  isLoading: store.orgs.isLoading,
  orgs: store.orgs.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getOrgsByUser: () => dispatch(getOrgsByUser()),
});

export const Memberships = connect(
  mapStateToProps,
  mapDispatchToProps
)(MembershipsContainer);
