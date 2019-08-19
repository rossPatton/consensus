import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Helmet } from '../../../components';
import { authenticateSession, updateUser } from '../../../redux';
import { title, canonical, description, keywords } from './_constants';
import { tContainerProps, tState, tStateUnion } from './_types';
import { UserAdminComponent } from './Component';

export class UserAdminContainer extends PureComponent<tContainerProps, tState> {
  state = {
    email: '',
    password: '',
    newPassword: '',
    username: '',
    fname: '',
    lname: '',
  };

  save = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    try {
      const {id} = this.props.session;
      const { newPassword, ...restOfState } = this.state;
      const query = restOfState;
      if (newPassword) {
        query.password = newPassword;
      }
      const newUser = await this.props.updateUser({id, ...query});
      console.log('this.state => ', this.state);
      console.log('query => ', query);
      console.log('newUser => ', newUser.payload);

      // combine new state with existing user
      const user = {
        ...query,
        ...newUser.payload,
      };

      console.log('combined user => ', user);

      return this.props.authenticateSession({
        username: user.username,
        password: user.password,
      });
    } catch (err) {
      console.error(err);
    }
  }

  updateState = (stateKey: tStateUnion, ev: any) => {
    this.setState({
      [stateKey]: ev.currentTarget.value,
    } as Pick<tState, tStateUnion>);
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
          updateState={this.updateState}
        />
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
