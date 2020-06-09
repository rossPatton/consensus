import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {ErrorBoundary, GenericLoader} from '~app/containers';
import {SearchFilter} from '~app/containers';
import {getMeetingsByUserId} from '~app/redux';

import {tContainerProps, tStore} from './_types';
import {RSVPsComponent} from './Component';

class RSVPsContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    const userId = props?.sessionThunk?.data?.profile?.id;
    if (userId) {
      props.getMeetingsByUserIdDispatch({userId});
    }
  }

  render() {
    const {meetingsByUserIdThunk} = this.props;
    return (
      <ErrorBoundary status={meetingsByUserIdThunk?.error?.status}>
        <GenericLoader
          isLoading={meetingsByUserIdThunk.isLoading}
          render={() => (
            <SearchFilter
              items={meetingsByUserIdThunk.data}
              render={searchProps => (
                <RSVPsComponent
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

const RSVPs = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RSVPsContainer);

export default RSVPs;
