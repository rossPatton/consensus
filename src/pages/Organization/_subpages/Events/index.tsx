import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { GenericLoader, Helmet } from '../../../../components';
import { Paginate } from '../../../../containers';
import { getEvents } from '../../../../redux';
import { tContainerProps, tState } from './_types';
import { EventsComponent } from './Component';

export class EventsContainer extends Component<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);

    const {match: {params: {page = 0} = {}}, org} = props;
    const offset = page ? parseInt(page, 10) : 0;

    props.getEvents({
      id: org.id,
      limit: -1,
      offset,
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
        <GenericLoader
          isLoading={this.props.isLoading}
          render={() => (
            <Paginate
              items={this.props.events}
              match={this.props.match}
              render={(itemsToRender: tEvent[]) => (
                <EventsComponent
                  events={itemsToRender}
                  role={this.props.role}
                />
              )}
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
  getEvents: (query: tIdQuery) => dispatch(getEvents(query)),
});

export const Events = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsContainer);
