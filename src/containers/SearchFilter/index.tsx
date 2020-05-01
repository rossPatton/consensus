import React, {PureComponent} from 'react';

import {fuzzFilterList} from '~app/utils';

import {tProps, tState} from './_types';

export default class SearchFilter extends PureComponent<tProps, tState> {
  static defaultProps = {
    searchKey: 'title',
  };

  state = {
    search: '',
    searchKey: this.props.searchKey,
  };

  onSearchChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();
    const search = ev.currentTarget.value;
    this.setState({search});
  }

  onFilterOptionChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    ev.preventDefault();
    const searchKey = ev.currentTarget.value;
    this.setState({searchKey});
  }

  filterItems = () => {
    const {search} = this.state;
    if (!search) return this.props.items;

    return fuzzFilterList({
      filterBy: this.props.filterBy,
      input: this.props.items || [],
      key: this.state.searchKey,
      search,
    });
  }

  render() {
    return this.props.render({
      items: this.filterItems(),
      onFilterOptionChange: this.onFilterOptionChange,
      onSearchChange: this.onSearchChange,
    });
  }
}
