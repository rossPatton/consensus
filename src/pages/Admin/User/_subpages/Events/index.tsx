import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {PrivacyFilter, SearchFilter} from '../../../../../containers';
import {getEventsByUserId} from '../../../../../redux';
import {tContainerProps, tStore} from './_types';
import {EventsComponent} from './Component';

class EventsContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    const userId = _.get(props.session, 'profile.id', null);
    if (userId) {
      props.getEventsByUserId({userId});
    }
  }

  render() {
    return (
      <PrivacyFilter
        items={this.props.eventsByUserId}
        render={(privacyProps: any) => (
          <SearchFilter
            items={privacyProps.items}
            render={(searchProps: tSearchFilterProps) => (
              <EventsComponent
                {...privacyProps}
                {...searchProps}
                eventsByUserId={searchProps.items}
                match={this.props.match}
              />
            )}
          />
        )}
      />
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  isLoading: store.eventsByUserId.isLoading,
  eventsByUserId: store.eventsByUserId.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getEventsByUserId: (query: {userId: number}) => dispatch(getEventsByUserId(query)),
});

const Events = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EventsContainer);

export default Events;
