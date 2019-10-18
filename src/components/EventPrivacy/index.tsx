import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {tContainerProps, tStore} from './_types';
import {EventPrivacyComponent} from './Component';

// TODO completely decouple this container from the other events pages etc
// this should be where the redux gets connected
class EventPrivacyContainer extends PureComponent<tContainerProps> {
  render() {
    if (!this.props.session || !this.props.session.id) return null;

    return (
      <EventPrivacyComponent
        isPrivate={this.props.isPrivate}
      />
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  session: store.session.data,
});

const EventPrivacy = connect(mapStateToProps)(EventPrivacyContainer);
export default EventPrivacy;
