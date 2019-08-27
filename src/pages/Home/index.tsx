import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {GenericLoader, Helmet} from '../../components';
import {ErrorBoundary} from '../../containers';
import {getUsers} from '../../redux';
import {canonical, description, keywords, title} from './_constants';
import {tContainerProps} from './_types';
import {HomeComponent} from './HomeComponent';

export class HomeContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    if (props.users.length > 0) return;
    props.getUsers();
  }

  render() {
    return (
      <ErrorBoundary>
        <Helmet
          canonical={canonical}
          title={title}
          meta={[
            { name: 'description', content: description },
            { name: 'keywords', content: keywords },
            { property: 'og:title', content: title },
            { property: 'og:description', content: description },
          ]}
        />
        <GenericLoader
          isLoading={this.props.isLoading}
          render={() => (
            <HomeComponent
              users={this.props.users}
            />
          )}
        />
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (store: { users: tThunk<tUser[]> }) => ({
  isLoading: store.users.isLoading,
  users: store.users.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getUsers: () => dispatch(getUsers()),
});

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
