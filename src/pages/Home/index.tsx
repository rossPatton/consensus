import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { getUsers } from '../../redux';
import { GenericLoader, Helmet } from '../../components';
import { title, canonical, description, keywords } from './_constants';
import { tContainerProps } from './_types';
import { HomeComponent } from './HomeComponent';

export class HomeContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    if (props.users.length > 0) return;
    props.getUsers();
  }

  render() {
    return (
      <>
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
      </>
    );
  }
}

const mapStateToProps = (state: { users: tThunk<tUser[]> }) => ({
  isLoading: state.users.isLoading,
  users: state.users.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getUsers: () => dispatch(getUsers()),
});

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
