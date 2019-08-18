import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Helmet } from '../../../components';
import { updateUser } from '../../../redux';
import { title, canonical, description, keywords } from './_constants';
import { tContainerProps, tState } from './_types';
import { UserAdminComponent } from './UserAdminComponent';

export class UserAdminContainer extends PureComponent<tContainerProps, tState> {
  state = {
    email: '',
    password: '',
    username: '',
    fname: '',
    lname: '',
  };

  save = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    try {
      const { id } = this.props.session;
      await this.props.updateUser({ id, ...this.state });
      // return this.props.setActiveSession(user.payload);
    } catch (err) {
      console.error(err);
    }
  }

  updateEmail = (ev: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      email: ev.currentTarget.value,
    });
  }

  updatePassword = (ev: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      password: ev.currentTarget.value,
    });
  }

  updateUsername = (ev: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      username: ev.currentTarget.value,
    });
  }

  updateFname = (ev: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      fname: ev.currentTarget.value,
    });
  }

  updateLname = (ev: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      lname: ev.currentTarget.value,
    });
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
        <UserAdminComponent
          {...this.state}
          session={this.props.session}
          save={this.save}
          updateEmail={this.updateEmail}
          updatePassword={this.updatePassword}
          updateUsername={this.updateUsername}
          updateFname={this.updateFname}
          updateLname={this.updateLname}
        />
      </>
    );
  }
}

const mapStateToProps = (state: {session: tThunk<tSession>}) => ({
  session: state.session.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  updateUser: (user: tSession) => dispatch(updateUser(user)),
});

export const UserAdmin = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAdminContainer);
