import React, {PureComponent} from 'react';

import {tProps, tState} from './_types';

// for use with events, decisions, etc
export default class PublishedFilter extends PureComponent<tProps, tState> {
  public state = {
    publishedFilter: 'n/a' as tPublishedFilter,
  };

  public filter = (items: any[]) => {
    const {publishedFilter} = this.state;
    if (publishedFilter === 'n/a') return items;
    const isDraft = publishedFilter === 'draft';
    return items.filter(item => item.isDraft === isDraft);
  };

  public onChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
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
