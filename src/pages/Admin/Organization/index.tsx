import React, { Component } from 'react';

import {tProps} from './_types';
import {OrgAdminComponent} from './Component';

export class OrgAdmin extends Component<tProps> {
  render() {
    return (
      <OrgAdminComponent
        match={this.props.match}
        session={this.props.session}
      />
    );
  }
}
