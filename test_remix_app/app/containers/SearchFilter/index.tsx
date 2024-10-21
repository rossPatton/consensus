import React, {PureComponent} from 'react';

import {fuzzFilterList} from '~app/utils';

import {tProps, tState} from './_types';

export default class SearchFilter extends PureComponent<tProps, tState> {
  static defaultProps = {
    searchKey: 'title',
  };

  state = {
    items: [] as object[],
    search: '',
    searchKey: this.props.searchKey,
  };

  onSearchChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();
    const search = ev.currentTarget.value;
    this.setState({search}, this.filterItems);
  }

  onFilterOptionChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    ev.preventDefault();
    const searchKey = ev.currentTarget.value;
    this.setState({searchKey}, this.filterItems);
  }

  filterItems = async () => {
    const {search} = this.state;
    if (!search) return this.props.items;

    const items = await fuzzFilterList({
      prefilter: this.props.prefilter,
      input: this.props.items || [],
      key: this.state.searchKey,
      search,
    });

    this.setState({
      items,
    });
  }

  render() {
    const items = this.state.search === ''
      ? this.props.items
      : this.state.items;

    return this.props.render({
      items,
      onFilterOptionChange: this.onFilterOptionChange,
      onSearchChange: this.onSearchChange,
    });
  }
}
