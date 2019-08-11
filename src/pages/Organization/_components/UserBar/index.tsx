import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { getUsersByOrg } from '../../../../redux';
import { tContainerProps } from './_types';
import { UserBarComponent } from './Component';

export class UserBarContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    if (props.usersByOrg.users.length > 0) return;
    props.getUsersByOrg({id: props.org.id});
  }

  render() {
    return (
      <>
        <UserBarComponent
          role={this.props.role}
          usersByOrg={this.props.usersByOrg}
        />
      </>
    );
  }
}

const mapStateToProps = (state: { usersByOrg: tThunk<tUsersByOrg> }) => ({
  usersByOrg: state.usersByOrg.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getUsersByOrg: (query: tIdQuery) => dispatch(getUsersByOrg(query)),
});

export const UserBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserBarContainer);
