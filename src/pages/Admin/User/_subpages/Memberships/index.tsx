import _ from 'lodash';
import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {Helmet} from '../../../../../components';
import {ErrorBoundary, GenericLoader} from '../../../../../containers';
import {Paginate, SearchFilter} from '../../../../../containers';
import {deleteOrgByUserId, getOrgsByUserId} from '../../../../../redux';
import {tContainerProps, tStore} from './_types';
import {MembershipsComponent} from './Component';

class MembershipsContainer extends PureComponent<tContainerProps> {
  leaveOrg = (ev: React.MouseEvent<HTMLButtonElement>, orgId: number) => {
    ev.preventDefault();
    if (orgId) {
      this.props.deleteOrgByUserIdDispatch({orgId})
        .catch(loglevel.error);
    }
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
          render={() => (
            <SearchFilter
              searchKey="name"
              items={orgsByUserIdThunk.data}
              render={(searchProps: tSearchFilterProps) => (
                <Paginate
                  items={searchProps.items}
                  render={(itemsToRender: tOrg[]) => (
                    <MembershipsComponent
                      leaveOrg={this.leaveOrg}
                      onSearchChange={searchProps.onSearchChange}
                      orgs={itemsToRender}
                      roles={this.props.roles}
                    />
                  )}
                />
              )}
            />
          )}
        />
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  orgsByUserIdThunk: store.orgsByUserId,
  roles: store.roles.data,
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
