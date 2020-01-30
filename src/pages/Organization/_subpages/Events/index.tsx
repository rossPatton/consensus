import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {Helmet} from '../../../../components';
import {ErrorBoundary, PrivacyFilter, SearchFilter} from '../../../../containers';
import {getEventsByOrgId} from '../../../../redux';
import {tContainerProps, tState, tStore} from './_types';
import {EventsComponent} from './Component';

class EventsContainer extends PureComponent<tContainerProps, tState> {
  constructor(props: tContainerProps) {
    super(props);
    this.getEvents();
  }

  state = {
    showPast: false,
  };

  togglePast = () =>
    this.setState({
      showPast: !this.state.showPast,
    }, this.getEvents);

  getEvents = () => {
    const {showPast} = this.state;
    const {match: {params: {page = 0} = {}}, org} = this.props;
    // if user is not signed in, only show public events
    const isPublic = !this.props.session.isAuthenticated;
    const offset = page ? parseInt(page, 10) : 0;

    this.props.getEventsDispatch({
      orgId: org.id,
      isDraft: false,
      isPublic,
      limit: -1,
      offset,
      showPast,
    });
  }

  render() {
    const {events} = this.props;

    return (
      <ErrorBoundary status={_.get(events, 'error.status', 200)}>
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
          items={events}
          render={(privacyProps: tPrivacyFilterProps) => (
            <SearchFilter
              items={privacyProps.items}
              render={(searchProps: tSearchFilterProps) => (
                <EventsComponent
                  {...privacyProps}
                  {...searchProps}
                  events={searchProps.items}
                  match={this.props.match}
                  role={this.props.role}
                  showPast={this.state.showPast}
                  togglePast={this.togglePast}
                />
              )}
            />
          )}
        />
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  events: store.eventsByOrgId.data,
  isLoading: store.eventsByOrgId.isLoading,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getEventsDispatch: (query: tGetEventQuery) => dispatch(getEventsByOrgId(query)),
});

const Events = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EventsContainer);

export default Events;
