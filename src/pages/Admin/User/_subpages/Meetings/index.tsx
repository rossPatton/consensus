import _ from 'lodash';
import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {Helmet} from '~app/components';
import {ErrorBoundary, GenericLoader} from '~app/containers';
import {SearchFilter} from '~app/containers';
import {getMeetingsByUserId} from '~app/redux';

import {tContainerProps, tStore} from './_types';
import {MeetingsComponent} from './Component';

class MeetingsContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    const userId = _.get(props, 'sessionThunk.data.profile.id', null);
    if (userId) {
      props.getMeetingsByUserIdDispatch({userId})
        .catch(loglevel.error);
    }
  }

  render() {
    const {meetingsByUserIdThunk} = this.props;
    return (
      <ErrorBoundary status={_.get(meetingsByUserIdThunk, 'error.status', 200)}>
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
          isLoading={meetingsByUserIdThunk.isLoading}
          render={() => (
            <SearchFilter
              items={meetingsByUserIdThunk.data}
              render={searchProps => (
                <MeetingsComponent
                  meetings={searchProps.items as ts.meeting[]}
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
  meetingsByUserIdThunk: store.meetingsByUserId,
  sessionThunk: store.session,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getMeetingsByUserIdDispatch: (query: {userId: number}) =>
    dispatch(getMeetingsByUserId(query)),
});

const Meetings = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MeetingsContainer);

export default Meetings;
