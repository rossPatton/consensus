import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {Helmet} from '../../../../components';
import {PrivacyFilter, SearchFilter} from '../../../../containers';
import {getEvents} from '../../../../redux';
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

  componentDidUpdate() {
    this.getEvents();
  }

  public togglePast = () =>
    this.setState({
      showPast: !this.state.showPast,
    });

  private getEvents = () => {
    const {showPast} = this.state;
    const {match: {params: {page = 0} = {}}, org} = this.props;
    // if user is not signed in, only show public events
    const isPublic = !this.props.session.isAuthenticated;
    const offset = page ? parseInt(page, 10) : 0;

    this.props.getEvents({
      id: org.id,
      isDraft: false,
      isPublic,
      limit: -1,
      offset,
      showPast,
    });
  }

  render() {
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
            <SearchFilter
              items={privacyProps.items}
              render={(searchProps: any) => (
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
