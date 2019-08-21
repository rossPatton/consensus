import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Dispatch } from 'redux';

import { Helmet } from '../../../components';
import { authenticateSession, updateUser } from '../../../redux';
import { title, canonical, description, keywords } from './_constants';
import { tContainerProps, tState, tStateUnion } from './_types';
import { UserAdminComponent } from './Component';

const initialState = {
  isClient: false,
  email: '',
  password: '',
  newPassword: '',
  username: '',
  fname: '',
  lname: '',
};

export class UserAdminContainer extends PureComponent<tContainerProps, tState> {
  state = initialState;

  componentDidMount() {
    // we do this so we only disable form submit when js is available
    this.setState({
      isClient: true,
    });
  }

  // TODO handle errors better, re-arrange try-catches
  save = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const {id} = this.props.session;
    const { newPassword, password } = this.state;

    let newUser = {};
    try {
      newUser = await this.props.updateUser({id, ...this.state});
    } catch (err) {
      console.error(err);
    }

    try {
      await this.props.authenticateSession({
      // @ts-ignore
        username: newUser.payload.username,
        password: newPassword || password,
      });
    } catch (err) {
      console.error(err);
    }

    this.setState(initialState);
  }

  updateState = (stateKey: tStateUnion, ev: any) => {
    this.setState({
      [stateKey]: ev.currentTarget.value,
    } as Pick<tState, tStateUnion>);
  }

  render() {
    const { session } = this.props;

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
        {!session.isAuthenticated && <Redirect to="/login" />}
        {session.isAuthenticated && (
          <UserAdminComponent
            {...this.state}
            session={session}
            save={this.save}
            updateState={this.updateState}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state: {session: tThunk<tSession>}) => ({
  session: state.session.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  authenticateSession: (user: tSession) => dispatch(authenticateSession(user)),
  updateUser: (user: tSession) => dispatch(updateUser(user)),
});

export const UserAdmin = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAdminContainer);
