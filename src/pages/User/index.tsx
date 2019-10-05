import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {GenericLoader, Helmet} from '../../components';
import {ErrorBoundary} from '../../containers';
import {getUserById} from '../../redux';
import {tProps, tStore} from './_types';
import {UserComponent} from './Component';

export class UserContainer extends PureComponent<tProps> {
  constructor(props: tProps) {
    super(props);
    const {id} = props.match.params;
    props.getUserById({id});
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
              user={this.props.user}
            />
          )}
        />
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  isLoading: store.user.isLoading,
  user: store.user.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getUserById: (query: tIdQuery) => dispatch(getUserById(query)),
});

export const User = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContainer);
