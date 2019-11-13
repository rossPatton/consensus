import React, {PureComponent} from 'react';

import {fuzzFilterList} from '../../utils';
import {tProps, tState} from './_types';

export default class Search extends PureComponent<tProps, tState> {
  static defaultProps = {
    items: [] as any[],
  };

  state = {
    items: this.props.items,
  };

  onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();

    const filteredList = fuzzFilterList({
      input: this.props.items || [],
      key: 'title',
      search: ev.currentTarget.value,
    });

    this.setState({
      items: filteredList,
    });
  }

  render() {
    const items = this.state.items.length > 0
      ? this.state.items
      : this.props.items;

    return this.props.render({
      items,
      onSearchChange: this.onChange,
    });
  }
}
