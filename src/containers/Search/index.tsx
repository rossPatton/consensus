import React, {PureComponent} from 'react';

import {fuzzFilterList} from '../../utils';
import {tProps, tState} from './_types';

export default class Search extends PureComponent<tProps, tState> {
  static defaultProps = {
    items: [] as any[],
    key: 'title',
  };

  public state = {
    items: this.props.items,
  };

  public onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();

    const search = ev.currentTarget.value;

    if (!search) {
      return this.setState({
        items: this.props.items,
      });
    }

    const filteredList = fuzzFilterList({
      input: this.props.items || [],
      key: this.props.searchKey,
      search,
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
