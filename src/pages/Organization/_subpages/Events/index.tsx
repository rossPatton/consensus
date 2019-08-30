import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { GenericLoader, Helmet } from '../../../../components';
import { getEventsByOrg } from '../../../../redux';
import { tContainerProps, tState } from './_types';
import { EventsComponent } from './Component';

export class EventsContainer extends Component<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);

    const {match: {params: {page = 0} = {}}, org} = props;
    const offset = page ? parseInt(page, 10) : 0;

    props.getEventsByOrg({
      id: org.id,
      limit: -1,
      offset,
    });
  }

  getSliceOfEvents = (events: tEvent[]) => {
    const newArray = [...events];

    const {match: {params: {page}}} = this.props;
    const activePage = page ? parseInt(page, 10) : 1;

    const end = activePage * 10;
    const start = end - 10;

    // -1 here because page numbers are 1 indexed, arrays are 0 indexed
    return newArray.slice(start, end - 1);
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
        <GenericLoader
          isLoading={this.props.isLoading}
          render={() => (
            <EventsComponent
              allEvents={this.props.events}
              eventsToRender={this.getSliceOfEvents(this.props.events)}
              match={this.props.match}
            />
          )}
        />
      </>
    );
  }
}

const mapStateToProps = (store: tState) => ({
  events: store.events.data,
  isLoading: store.events.isLoading,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getEventsByOrg: (query: tIdQuery) => dispatch(getEventsByOrg(query)),
});

export const Events = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsContainer);
