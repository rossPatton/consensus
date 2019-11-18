import React, {PureComponent} from 'react';

import {tProps, tState} from './_types';

// for use with events
export default class PrivacyFilter extends PureComponent<tProps, tState> {
  state = {
    privacyFilter: 'n/a' as tPrivacyFilter,
  };

  public filter = (evs: tEvent[]) => {
    const {privacyFilter} = this.state;
    if (privacyFilter === 'n/a') return evs;

    const isPrivate = privacyFilter === 'private';
    return evs.filter(ev => ev.isPrivate === isPrivate);
  };

  public onChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    ev.preventDefault();
    this.setState({
      privacyFilter: ev.currentTarget.value as tPrivacyFilter,
    });
  }

  render() {
    const items = this.filter(this.props.items);
    return this.props.render({
      items,
      onPrivacyFilterChange: this.onChange,
      privacyFilter: this.state.privacyFilter,
    });
  }
}
