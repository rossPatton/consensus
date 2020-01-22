import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {GenericLoader, Helmet} from '../../components';
import {ErrorBoundary} from '../../containers';
import {getOrgsByUser, getUserById} from '../../redux';
import { tOrgWithRole } from '../Admin/User/_subpages/Memberships/_types';
import {tContainerProps, tStore} from './_types';
import {UserComponent} from './Component';

class UserContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    const {id} = props.match.params;
    props.getUserById({id});
    props.getOrgsByUser({id});
  }

  render() {
    return (
      <ErrorBoundary>
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
          isLoading={this.props.isLoading}
          render={() => (
            <UserComponent
              orgs={this.props.orgs}
              user={this.props.user}
            />
          )}
        />
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  isLoading: store.user.isLoading && store.orgs.isLoading,
  orgs: store.orgs.data as tOrgWithRole[],
  user: store.user.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getUserById: (query: tIdQueryC) => dispatch(getUserById(query)),
  getOrgsByUser: (query: tIdQueryC) => dispatch(getOrgsByUser(query)),
});

const User = connect(mapStateToProps, mapDispatchToProps)(UserContainer);
export default User;
