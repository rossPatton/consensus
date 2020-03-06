import React, {Component} from 'react';

import {tProps, tState} from './_types';

// for use with events, decisions, etc
export default class PublishedFilter extends Component<tProps, tState> {
  state = {
    publishedFilter: 'published' as tPublishedFilter,
  };

  filter = (items: tEvent[]) => {
    const {publishedFilter} = this.state;
    if (publishedFilter === 'n/a') return items;
    const isDraft = publishedFilter === 'draft';
    return items.filter(item => item.isDraft === isDraft);
  };

  onChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    ev.preventDefault();
    this.setState({
      publishedFilter: ev.currentTarget.value as tPublishedFilter,
    });
  }

  render() {
    const items = this.filter(this.props.items);
    return this.props.render({
      items,
      onPublishedFilterChange: this.onChange,
      publishedFilter: this.state.publishedFilter,
    });
  }
}
