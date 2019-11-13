import qs from 'querystring';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {Helmet} from '../../../../components';
import {Paginate, Search} from '../../../../containers';
import {getEvents} from '../../../../redux';
import {tContainerProps, tState, tStore} from './_types';
import {EventsComponent} from './Component';

class EventsContainer extends PureComponent<tContainerProps, tState> {
  constructor(props: tContainerProps) {
    super(props);
    this.getEvents();
  }

  state = {
    events: [] as tEvent[],
    privacyFilter: 'n/a' as tPrivacyFilter,
  };

  componentDidUpdate() {
    this.getEvents();
  }

  private getEvents = () => {
    const {location, match: {params: {page = 0} = {}}, org} = this.props;
    const query = qs.parse(location.search.replace('?', ''));
    // only show public events if user is not signed in
    const isPublic = !this.props.session.isAuthenticated;
    const offset = page ? parseInt(page, 10) : 0;
    const showPast = query.showPast === 'true';

    this.props.getEvents({
      id: org.id,
      isDraft: false,
      isPublic,
      showPast,
      limit: -1,
      offset,
    });
  }

  filter = (evs: tEvent[]) => {
    const {privacyFilter} = this.state;
    if (privacyFilter === 'n/a') return evs;

    const isPrivate = privacyFilter === 'private';
    return evs.filter(ev => ev.isPrivate === isPrivate);
  };

  onPrivacyFilterChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    ev.preventDefault();
    this.setState({
      privacyFilter: ev.currentTarget.value as tPrivacyFilter,
    });
  }

  render() {
    const {location} = this.props;
    const query = qs.parse(location.search.replace('?', ''));
    const showPast = query.showPast === 'true';

    const eventsToRender = this.filter(
      this.state.events.length > 0
        ? this.state.events
        : this.props.events,
    );

    return (
      <>
        <Helmet
          canonical=""
          title=""
          meta={[
            { name: 'description', content: '' },
            { name: 'keywords', content: '' },
            { property: 'og:title', content: '' },
            { property: 'og:description', content: '' },
          ]}
        />
        <Search
          items={eventsToRender}
          render={(searchProps: any) => (
            <Paginate
              items={searchProps.items}
              page={this.props.match.params.page}
              render={(itemsToRender: tEvent[]) => (
                <EventsComponent
                  events={itemsToRender}
                  filterType={this.state.privacyFilter}
                  pathname={location.pathname}
                  role={this.props.role}
                  showPast={showPast}
                  onPrivacyFilterChange={this.onPrivacyFilterChange}
                  onSearchChange={searchProps.onSearchChange}
                />
              )}
            />
          )}
        />
      </>
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

const Events = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EventsContainer);

export default Events;
