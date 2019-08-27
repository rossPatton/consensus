import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Dispatch } from 'redux';

import { GenericLoader, Helmet } from '../../components';
import { getEventById, getEventsByOrg } from '../../redux';
import { tProps, tStore } from './_types';
import { EventComponent } from './Component';

export class EventContainer extends PureComponent<tProps> {
  constructor(props: tProps) {
    super(props);
    const { id } = props.match.params;

    props.getEventById({id})
      .then((res: {payload: tEvent}) => {
      // for rendering the 'more by name' sidebar
      // TODO it shouldn't get the current event being looked at
        return props.getEventsByOrg({
          id: res.payload.orgId,
          exclude: id,
        });
      })
      .catch(console.error);
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
            <EventComponent
              event={this.props.event}
              events={this.props.events}
            />
          )}
        />
      </>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  isLoading: store.event.isLoading,
  event: store.event.data,
  events: store.events.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getEventById: (query: tIdQuery) => dispatch(getEventById(query)),
  getEventsByOrg: (query: tIdQuery) => dispatch(getEventsByOrg(query)),
});

export const Event = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventContainer);
