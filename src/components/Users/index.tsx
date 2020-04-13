import _ from 'lodash';
import React from 'react';

import {MediaContext} from '../../context/MatchMediaProvider/_context';
import {Paginate} from '../../containers';
import {tProps, tState} from './_types';
import {UsersComponent} from './Component';

class Users extends React.PureComponent<tProps, tState> {
  static contextType = MediaContext;

  state = {
    showMobileControls: null as number | null,
  };

  toggleMobileControls = (index: number) => {
    let showMobileControls = index;
    if (index === this.state.showMobileControls) {
      showMobileControls = null;
    }

    this.setState({
      showMobileControls,
    });
  }

  render() {
    const {count = 10, sessionRole, users} = this.props;
    const isEditable = sessionRole === 'admin' || sessionRole === 'facilitator';

    if (users.length === 0) {
      return (
        <>No users found that meet this criteria.</>
      );
    }

    return (
      <Paginate
        count={count}
        items={users}
        render={(usersToRender: tUser[]) => (
          <UsersComponent
            isDesktop={this.context.isDesktop}
            isEditable={isEditable}
            isMobile={this.context.isMobile}
            memberName={this.props.memberName}
            modName={this.props.modName}
            removeUser={this.props.removeUser}
            setUserRole={this.props.setUserRole}
            showMobileControls={this.state.showMobileControls}
            toggleMobileControls={this.toggleMobileControls}
            users={usersToRender}
          />
        )}
      />
    );
  }
}

export default Users;
