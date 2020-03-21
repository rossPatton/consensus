import _ from 'lodash';
import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {Helmet} from '../../components';
import {ErrorBoundary, GenericLoader, Template} from '../../containers';
import {getGroupsByUserId, getUser} from '../../redux';
import {tContainerProps, tStore} from './_types';
import {UserComponent} from './Component';

class UserContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    const {id: userId} = props.match.params;
    props.getUserByIdDispatch({id: userId})
      .then(res => {
        if (!res.payload.privateMemberships) {
          props.getGroupsByUserIdDispatch({noPending: true, userId});
        }
        return null;
      }).catch(loglevel.error);
  }

  render() {
    return (
      <Template>
        <ErrorBoundary status={_.get(this.props, 'user.error.status', 200)}>
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
                match={this.props.match}
                orgs={this.props.orgsByUserId}
                user={this.props.user}
              />
            )}
          />
        </ErrorBoundary>
      </Template>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  isLoading: store.user.isLoading,
  orgsByUserId: store.orgsByUserId.data,
  user: store.user.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getUserByIdDispatch: (query: tIdQuery) =>
    dispatch(getUser(query)),

  getGroupsByUserIdDispatch: (query: tGroupsByUserIdQuery) =>
    dispatch(getGroupsByUserId(query)),
});

const User = connect(mapStateToProps, mapDispatchToProps)(UserContainer);
export default User;
