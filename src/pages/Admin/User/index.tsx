import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { Helmet } from '../../../components';
import { setActiveSession, updateUser } from '../../../redux';
import { title, canonical, description, keywords } from './_constants';
import { tContainerProps } from './_types';
import { UserAdminComponent } from './UserAdminComponent';

export class UserAdminContainer extends PureComponent<tContainerProps> {
  state = {
    email: '',
    password: '',
    username: '',
    fname: '',
    lname: '',
  };

  save = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const { id } = this.props.session;
    this.props.updateUser({ id, ...this.state })
      .then((res: { payload: tSession }) => this.props.setActiveSession(res.payload))
      .catch(console.error);
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

const mapStateToProps = (state: { session: tSession }) =>
  ({ session: state.session });

const mapDispatchToProps = (dispatch: Function) => ({
  updateUser: (user: tSession) => dispatch(updateUser(user)),
  setActiveSession: (user: tSession) => dispatch(setActiveSession(user)),
});

export const UserAdmin = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAdminContainer);
