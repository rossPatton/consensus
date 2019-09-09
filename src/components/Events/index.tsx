import _ from 'lodash';
import React, {PureComponent} from 'react';

import {tProps} from './_types';
import {EventsComponent} from './Component';

export class Events extends PureComponent<tProps> {
  render() {
    return (
      <EventsComponent
        events={this.props.events}
        isEditable={this.props.isEditable}
        tiny={this.props.tiny}
      />
    );
  }
}
