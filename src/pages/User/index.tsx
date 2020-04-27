import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {Helmet} from '~app/components';
import {ErrorBoundary, GenericLoader, Template} from '~app/containers';
import {getGroupsByUserId, getUser} from '~app/redux';

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
    const {userThunk} = this.props;
    return (
      <Template>
        <ErrorBoundary status={userThunk?.error?.status}>
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
            isLoading={userThunk.isLoading}
            render={() => (
              <UserComponent
                match={this.props.match}
                groups={this.props.groupsByUserId}
                user={userThunk.data}
              />
            )}
          />
        </ErrorBoundary>
      </Template>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  groupsByUserId: store.groupsByUserId.data,
  userThunk: store.user,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getUserByIdDispatch: (query: ts.idQuery) =>
    dispatch(getUser(query)),

  getGroupsByUserIdDispatch: (query: ts.groupsByUserIdQuery) =>
    dispatch(getGroupsByUserId(query)),
});

const User = connect(mapStateToProps, mapDispatchToProps)(UserContainer);
export default User;
