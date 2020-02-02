import React, {Component} from 'react';

import {tProps, tState} from './_types';

// for use with events
export default class PrivacyFilter extends Component<tProps, tState> {
  state = {
    privacyFilter: 'n/a' as tPrivacyFilter,
  };

  filter = (evs: tEvent[]) => {
    const {privacyFilter} = this.state;
    if (privacyFilter === 'n/a') return evs;

    const isPrivate = privacyFilter === 'private';
    return evs.filter(ev => ev.isPrivate === isPrivate);
  };

  onChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    ev.preventDefault();
    this.setState({
      privacyFilter: ev.currentTarget.value as tPrivacyFilter,
    });
  }

  render() {
    return this.props.render({
      items: this.filter(this.props.items),
      onPrivacyFilterChange: this.onChange,
      privacyFilter: this.state.privacyFilter,
    });
  }
}
