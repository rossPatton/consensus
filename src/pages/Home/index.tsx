import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { getUsers } from '../../redux';
import { GenericLoader, Helmet } from '../../components';
import { title, canonical, description, keywords } from './_constants';
import { tContainerProps, tThunkProps } from './_types';
import { HomeComponent } from './HomeComponent';

export class HomeContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
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
          isLoading={this.props.users.isLoading}
          render={() => (
            <HomeComponent
              users={this.props.users.data}
            />
          )}
        />
      </>
    );
  }
}

const mapStateToProps = (state: { users: tThunkProps }) => ({
  users: state.users,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getUsers: (url: string) => dispatch(getUsers(url)),
});

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
