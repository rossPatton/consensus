import React, {PureComponent} from 'react';

import {tProps} from './_types';
import {OrgAdminComponent} from './Component';

export class OrgAdmin extends PureComponent<tProps> {
  render() {
    return (
      <OrgAdminComponent
        match={this.props.match}
        session={this.props.session}
      />
    );
  }
}
