import {Helmet} from '@app/components';
import {ErrorBoundary, GenericLoader} from '@app/containers';
import {SearchFilter} from '@app/containers';
import {getEventsByUserId} from '@app/redux';
import _ from 'lodash';
import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {tContainerProps, tStore} from './_types';
import {MeetingsComponent} from './Component';

class MeetingsContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    const userId = _.get(props, 'sessionThunk.data.profile.id', null);
    if (userId) {
      props.getEventsByUserIdDispatch({userId})
        .catch(loglevel.error);
    }
  }

  render() {
    const {eventsByUserIdThunk} = this.props;
    return (
      <ErrorBoundary status={_.get(eventsByUserIdThunk, 'error.status', 200)}>
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
          isLoading={eventsByUserIdThunk.isLoading}
          render={() => (
            <SearchFilter
              items={eventsByUserIdThunk.data}
              render={searchProps => (
                <MeetingsComponent
                  events={searchProps.items as tEvent[]}
                  onFilterOptionChange={searchProps.onFilterOptionChange}
                  onSearchChange={searchProps.onSearchChange}
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
  eventsByUserIdThunk: store.eventsByUserId,
  sessionThunk: store.session,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getEventsByUserIdDispatch: (query: {userId: number}) =>
    dispatch(getEventsByUserId(query)),
});

const Meetings = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MeetingsContainer);

export default Meetings;
