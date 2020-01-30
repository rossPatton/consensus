import React, {PureComponent} from 'react';

// import {connect} from 'react-redux';
// import {getRoles, getRsvps} from '../../../redux';
import {tProps} from './_types';
import {UserAdminComponent} from './Component';

export class UserAdmin extends PureComponent<tProps> {
  // constructor(props: tProps) {
  //   super(props);
  //   props.getRoles();
  //   props.getRsvps();
  // }

  render() {
    return (
      <UserAdminComponent
        match={this.props.match}
      />
    );
  }
}

// const mapStateToProps = (store: any) => ({
//   isLoading: store.roles.isLoading || store.rsvps.isLoading,
// });

// const mapDispatchToProps = (dispatch: Function) => ({
//   getRoles: () => dispatch(getRoles()),
//   getRsvps: () => dispatch(getRsvps()),
// });

// export const UserAdmin;
//  = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(UserAdminContainer);
