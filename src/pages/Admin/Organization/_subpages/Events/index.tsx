import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {Paginate} from '../../../../../containers';
import {getEvents} from '../../../../../redux';
import {fuzzFilterList} from '../../../../../utils';
import {tContainerProps, tState, tStore} from './_types';
import {EventsComponent} from './Component';

export class EventsContainer extends PureComponent<tContainerProps, tState> {
  constructor(props: tContainerProps) {
    super(props);

    const {match: {params: {page = 0} = {}}, session} = props;
    const offset = page ? parseInt(page, 10) : 0;

    props.getEvents({
      id: session.profileId,
      limit: -1,
      offset,
    });
  }

  state = {
    events: this.props.events,
    privacyFilter: 'n/a' as tPrivacyFilter,
    publishedFilter: 'n/a' as tPublishedFilter,
  };

  // re-run the filter whenever the list array or filter text changes
  // also we filter out non-drafts in this particular case, regardless of privacy
  // TODO maybe memoize
  filter = (evs: tEvent[]) => {
    const evsFilteredByPublishStatus = this.filterByPublished(evs);
    return this.filterByPrivacy(evsFilteredByPublishStatus);
  };

  filterByPrivacy = (evs: tEvent[]) => {
    const {privacyFilter} = this.state;
    if (privacyFilter === 'n/a') return evs;

    const isPrivate = privacyFilter === 'private';
    return evs.filter(ev => ev.isPrivate === isPrivate);
  };

  filterByPublished = (evs: tEvent[]) => {
    const {publishedFilter} = this.state;
    if (publishedFilter === 'n/a') return evs;
    const isDraft = publishedFilter === 'draft';
    return evs.filter(ev => ev.isDraft === isDraft);
  };

  onPrivacyFilterChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    ev.preventDefault();
    this.setState({
      privacyFilter: ev.currentTarget.value as tPrivacyFilter,
    });
  }

  onPublishedFilterChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    ev.preventDefault();
    this.setState({
      publishedFilter: ev.currentTarget.value as tPublishedFilter,
    });
  }

  onSearchChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();

    const filteredList = fuzzFilterList({
      input: this.props.events || [],
      key: 'title',
      search: ev.currentTarget.value,
    });

    this.setState({
      events: filteredList,
    });
  }

  render() {
    const eventsToRender = this.filter(
      this.state.events.length > 0
        ? this.state.events
        : this.props.events
    );

    return (
      <Paginate
        items={eventsToRender}
        match={this.props.match}
        render={(itemsToRender: tEvent[]) => (
          <EventsComponent
            events={itemsToRender}
            onPrivacyFilterChange={this.onPrivacyFilterChange}
            onPublishedFilterChange={this.onPublishedFilterChange}
            onSearchChange={this.onSearchChange}
          />
        )}
      />
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  events: store.events.data,
  isLoading: store.events.isLoading,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getEvents: (query: tIdQuery) => dispatch(getEvents(query)),
});

export const Events = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsContainer);
