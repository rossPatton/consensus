import React, {Component} from 'react';

import {tProps, tState} from './_types';

// for use with meetings
export default class RoleFilter extends Component<tProps, tState> {
  state = {
    roleFilter: 'n/a' as ts.role,
  };

  // re-run the filter whenever the list array or filter text changes:
  // TODO maybe memoize
  filter = (users: ts.user[]) => {
    if (this.state.roleFilter === 'n/a') return users;
    return users.filter(user => user.role === this.state.roleFilter);
  };

  onChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    ev.preventDefault();
    this.setState({
      roleFilter: ev.currentTarget.value as ts.role,
    });
  }

  render() {
    return this.props.render({
      items: this.filter(this.props.items),
      onRoleFilterChange: this.onChange,
      roleFilter: this.state.roleFilter,
    });
  }
}
