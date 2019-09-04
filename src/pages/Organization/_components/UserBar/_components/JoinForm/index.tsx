import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Dispatch} from 'redux';

import {postNewUserByOrg, setRole, setUserByOrg} from '../../../../../../redux';
import {tProps} from './_types';
import {JoinFormComponent} from './Component';

class JoinFormContainer extends React.PureComponent<tProps> {
  onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    this.props.postNewUserByOrg({id: this.props.session.id})
      .then((res: any) => this.props.setUserByOrg(res.payload))
      .then(() => this.props.setRole({role: 'member'}))
      .catch(console.error);
  }

  render() {
    const {role, session} = this.props;

    if (role) {
      return (
        <span className="bgWhite brdA1 br8 lh1 pL2 pR2 mR2 fx aiCtr">
          <span className="fs4 mR1">✔</span>
          <span className="ttCap">{role}</span>
        </span>
      );
    }

    if (!session.isAuthenticated) {
      return (
        <Link
          to="/signup"
          className="bgWhite hvrBgGrey1 brdA1 br8 p1 pL2 pR2 mR2 trans1">
          Join This Organization
        </Link>
      );
    }

    return (
      <JoinFormComponent
        onSubmit={this.onSubmit}
      />
    );
  }
}

const mapStateToProps = (store: any) => ({
  isLoading: store.usersByOrg.isLoading,
  usersByOrg: store.usersByOrg.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  postNewUserByOrg: (query: tIdQuery) => dispatch(postNewUserByOrg(query)),
  setRole: (query: any) => dispatch(setRole(query)),
  setUserByOrg: (query: any) => dispatch(setUserByOrg(query)),
});

export const JoinForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(JoinFormContainer);
