import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {GenericLoader, Helmet} from '../../../../components';
import {getEvents} from '../../../../redux';
import {tContainerProps, tStore} from './_types';
import {OverviewComponent} from './Component';
// TODO use context for match cause passing it around everywhere is annoying
class OverviewContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    // only show public events if user is not signed in
    const isLoggedIn = props.session.isAuthenticated;
    props.getEvents({
      id: props.org.id,
      showPast: false,
      isPublic: !isLoggedIn,
      limit: -1,
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
            <OverviewComponent
              events={this.props.events.slice(0, 3)}
              match={this.props.match}
              org={this.props.org}
              role={this.props.role}
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

const mapDispatchToProps = (dispatch: Function) => ({
  getEvents: (query: tIdQueryC) => dispatch(getEvents(query)),
});

const Overview = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OverviewContainer);

export default Overview;
