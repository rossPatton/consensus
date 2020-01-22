import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {Paginate, SearchFilter} from '../../../../../containers';
import {getOrgsBySession, leaveOrg} from '../../../../../redux';
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

  leaveOrg = (ev: React.MouseEvent<HTMLButtonElement>, orgId: number) => {
    ev.preventDefault();
    this.props.leaveOrg({orgId});
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
      <SearchFilter
        searchKey="name"
        items={orgsToRender}
        render={(searchProps: tSearchFilterProps) => (
          <Paginate
            items={searchProps.items}
            page={this.props.match.params.page}
            render={(itemsToRender: tOrgWithRole[]) => (
              <MembershipsComponent
                leaveOrg={this.leaveOrg}
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

const mapDispatchToProps = (dispatch: Function) => ({
  leaveOrg: (query: {orgId: number}) => dispatch(leaveOrg(query)),
  getOrgsBySession: () => dispatch(getOrgsBySession()),
});

const Memberships = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MembershipsContainer);

export default Memberships;
