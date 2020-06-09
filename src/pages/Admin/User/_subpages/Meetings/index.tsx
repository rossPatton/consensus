import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {ErrorBoundary, GenericLoader} from '~app/containers';
import {SearchFilter} from '~app/containers';
import {getMeetingsByLocation} from '~app/redux';

import {tContainerProps, tStore} from './_types';
import {MeetingsComponent} from './Component';

class MeetingsContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    this._getMeetingsNearMe();
  }

  _getMeetingsNearMe = async () => {
    const {meetingsByLocationThunk, geoThunk, sessionThunk} = this.props;

    if (meetingsByLocationThunk.fetched) return;
    if (meetingsByLocationThunk.error) return;

    if (sessionThunk?.data?.profile?.cityId) {
      return this.props.getMeetingsByLocationDispatch({
        id: sessionThunk?.data?.profile?.cityId,
      });
    } else if (geoThunk.fetched) {
      return this.props.getMeetingsByLocationDispatch({
        city: geoThunk.data.city,
        regionCode: geoThunk.data.regionCode,
      });
    }


  }

  render() {
    const {geoThunk, meetingsByLocationThunk} = this.props;
    return (
      <ErrorBoundary
        isSubPage
        status={meetingsByLocationThunk?.error?.status}>
        <GenericLoader
          isLoading={geoThunk.isLoading || meetingsByLocationThunk.isLoading}
          render={() => (
            <SearchFilter
              items={meetingsByLocationThunk.data}
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
  meetingsByLocationThunk: store.meetingsByLocation,
  geoThunk: store.geo,
  sessionThunk: store.session,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getMeetingsByLocationDispatch: (query: ts.meetingsByLocationQuery) =>
    dispatch(getMeetingsByLocation(query)),
});

const Meetings = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MeetingsContainer);

export default Meetings;
