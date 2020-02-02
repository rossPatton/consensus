import React, {Component} from 'react';

import {fuzzFilterList} from '../../utils';
import {tProps, tState} from './_types';

export default class SearchFilter extends Component<tProps, tState> {
  static defaultProps = {
    searchKey: 'title',
  };

  state = {
    search: '',
  };

  onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();
    const search = ev.currentTarget.value;
    this.setState({search});
  }

  filterItems = () => {
    const {search} = this.state;

    if (!search) return this.props.items;

    return fuzzFilterList({
      input: this.props.items || [],
      key: this.props.searchKey,
      search,
    });
  }

  render() {
    return this.props.render({
      items: this.filterItems(),
      onSearchChange: this.onChange,
    });
  }
}
