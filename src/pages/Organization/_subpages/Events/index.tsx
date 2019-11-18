import qs from 'querystring';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {Helmet} from '../../../../components';
import {PrivacyFilter, Search} from '../../../../containers';
import {getEvents} from '../../../../redux';
import {tContainerProps, tStore} from './_types';
import {EventsComponent} from './Component';

class EventsContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    this.getEvents();
  }

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

  render() {
    const {location} = this.props;
    const query = qs.parse(location.search.replace('?', ''));

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
        <PrivacyFilter
          items={this.props.events}
          render={(privacyProps: any) => (
            <Search
              items={privacyProps.items}
              render={(searchProps: any) => (
                <EventsComponent
                  {...privacyProps}
                  {...searchProps}
                  events={searchProps.items}
                  match={this.props.match}
                  pathname={location.pathname}
                  role={this.props.role}
                  showPast={query.showPast === 'true'}
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
