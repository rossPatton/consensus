import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {GenericLoader, Helmet} from '../../../../components';
import {ErrorBoundary} from '../../../../containers';
import {getEventsByOrgId} from '../../../../redux';
import {tContainerProps, tStore} from './_types';
import {OverviewComponent} from './Component';

// TODO use context for match cause passing it around everywhere is annoying
class OverviewContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    // only show public events if user is not signed in
    const isLoggedIn = props.session.isAuthenticated;

    if (props.org.id !== 0) {
      props.getEvents({
        orgId: props.org.id,
        showPast: false,
        isPublic: !isLoggedIn,
        limit: 100,
      });
    }
  }

  render() {
    return (
      <ErrorBoundary status={_.get(this.props.events, 'error.status', 200)}>
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
            <OverviewComponent
              events={this.props.events.slice(0, 3)}
              match={this.props.match}
              org={this.props.org}
              role={this.props.role}
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
  getEvents: (query: tGetEventQuery) => dispatch(getEventsByOrgId(query)),
});

const Overview = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OverviewContainer);

export default Overview;
